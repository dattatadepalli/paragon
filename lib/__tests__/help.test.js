const chalk = require('chalk');

const { helpCommand, findCommandByName } = require('../help');
/* eslint-disable no-console */
console.log = jest.fn();
console.error = jest.fn();
/* eslint-enable no-console */

describe('helpCommand', () => {
  beforeEach(() => {
    /* eslint-disable no-console */
    console.log.mockClear();
    console.error.mockClear();
    /* eslint-enable no-console */
  });

  const mockCommands = {
    test: {
      description: 'Test command',
      parameters: [
        {
          name: 'param1',
          description: 'First parameter',
          defaultValue: 'default1',
        },
      ],
      options: [
        {
          name: '--option1',
          description: 'First option',
          defaultValue: 'optDefault1',
        },
      ],
    },
    another: {
      description: 'Another command',
      parameters: [],
      options: [],
    },
  };

  it('displays all commands when no specific command is provided', () => {
    helpCommand(mockCommands, []);
    /* eslint-disable no-console */
    expect(console.log).toHaveBeenCalledWith(chalk.yellow.bold('Paragon Help'));
    expect(console.log).toHaveBeenCalledWith('Available commands:');
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('test'));
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('another'));
    /* eslint-enable no-console */
  });

  it('displays specific command details when command name is provided', () => {
    helpCommand(mockCommands, ['test']);
    /* eslint-disable no-console */
    expect(console.log).toHaveBeenCalledWith(chalk.yellow.bold('Paragon Help'));
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('test'));
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('First parameter'));
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('First option'));
    /* eslint-enable no-console */
  });

  it('displays error for unknown command', () => {
    helpCommand(mockCommands, ['unknown']);

    expect(console.error).toHaveBeenCalledWith(/* eslint-disable-line no-console */
      chalk.red.bold('Unknown command. Usage: paragon help <command>.'),
    );
  });

  it('handles commands without parameters or options', () => {
    helpCommand(mockCommands, ['another']);
    /* eslint-disable no-console */
    expect(console.log).toHaveBeenCalledWith(chalk.yellow.bold('Paragon Help'));
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('another'));
    /* eslint-enable no-console */
  });

  it('handles parameters with choices', () => {
    const commandsWithChoices = {
      test: {
        description: 'Test command',
        parameters: [
          {
            name: 'param1',
            description: 'Parameter with choices',
            choices: ['choice1', 'choice2'],
            defaultValue: 'choice1',
          },
        ],
      },
    };

    helpCommand(commandsWithChoices, ['test']);
    expect(console.log).toHaveBeenCalledWith(/* eslint-disable-line no-console */
      expect.stringContaining(`${chalk.yellow.bold('param1')} ${chalk.grey('choice1,choice2, Default: choice1')}`),
    );
  });
});

describe('findCommandByName', () => {
  const mockCommands = {
    test: { description: 'Test command' },
    another: { description: 'Another command' },
  };

  it('returns command object when command exists', () => {
    const result = findCommandByName('test', mockCommands);
    expect(result).toEqual({ test: { description: 'Test command' } });
  });

  it('returns null when command does not exist', () => {
    const result = findCommandByName('unknown', mockCommands);
    expect(result).toBeNull();
  });
});
