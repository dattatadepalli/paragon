import Form, { CheckboxControl, RadioControl } from '../../Form';
import { getInputType } from '../utils';

describe('utils', () => {
  it('getInputType returns correct type', () => {
    expect(getInputType('SelectableBox', undefined)).toEqual(RadioControl);
    expect(getInputType('SelectableBox', 'wrongtype')).toEqual(RadioControl);
    expect(getInputType('SelectableBox', 'radio')).toEqual(RadioControl);
    expect(getInputType('SelectableBox', 'checkbox')).toEqual(CheckboxControl);
    expect(getInputType('SelectableBoxSet', undefined)).toEqual(Form.RadioSet);
    expect(getInputType('SelectableBoxSet', 'wrongtype')).toEqual(Form.RadioSet);
    expect(getInputType('SelectableBoxSet', 'radio')).toEqual(Form.RadioSet);
    expect(getInputType('SelectableBoxSet', 'checkbox')).toEqual(Form.CheckboxSet);
  });

  it('getInputType returns null for unknown components', () => {
    expect(getInputType('UnknownComponent', 'radio')).toBeNull();
    expect(getInputType(undefined, 'radio')).toBeNull();
    expect(getInputType(null, 'radio')).toBeNull();
    expect(getInputType(123, 'radio')).toBeNull();
  });
});
