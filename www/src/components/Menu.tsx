import React, { useContext } from 'react';
import { useLocation } from '@gatsbyjs/reach-router';
import PropTypes from 'prop-types';
import { Link, graphql, useStaticQuery } from 'gatsby';
import classNames from 'classnames';
import {
  Tooltip,
  OverlayTrigger,
  Button,
  Badge,
  Collapsible,
  Hyperlink,
  ButtonGroup,
  Image,
} from '~paragon-react';
import Search from './Search';
import { SettingsContext } from '../context/SettingsContext';
import { THEMES } from '../../theme-config';
import {
  PLAYGROUND_EVENTS,
  sendUserAnalyticsEvent,
  CONTRAST_CHECKER_CLICKED_EVENT,
} from '../../segment-events';
import { FOUNDATION_PAGES } from '../config';

// MDX transforms markdown generated by gatsby-transformer-react-docgen
// This query filters out all of those markdown nodes and assumes all others
// are for page creation purposes.
const menuQuery = graphql`
  query menuQuery {
    components: allMdx(
      filter: {
        parent: {
          internal: { owner: { nin: "gatsby-transformer-react-docgen" } }
        }
        frontmatter: { type: {} }
      }
      sort: { frontmatter: {title: ASC} }
    ) {
      categories: group(field: {frontmatter: {categories: SELECT}}) {
        nodes {
          ...ComponentPage
        }
        fieldValue
      }
      types: group(field: {frontmatter: {type: SELECT}}) {
        nodes {
          ...ComponentPage
        }
        fieldValue
      }
    }
  }

  fragment ComponentPage on Mdx {
    id
    frontmatter {
      categories
      type
      title
      status
    }
    fields {
      slug
    }
  }
`;

export interface IComponentNavItem {
  id: string,
  fields: { slug: string },
  frontmatter: {
    categories: Array<string>,
    title: string,
    type: string,
    status?: string,
  },
  isActive?: boolean,
}

export function ComponentNavItem({
  id, fields, frontmatter, isActive, ...props
}: IComponentNavItem) {
  const isDeprecated = frontmatter?.status?.toLowerCase().includes('deprecate') || false;
  const linkNode = isDeprecated ? (
    <OverlayTrigger
      placement="right"
      overlay={<Tooltip id={`tooltip-deprecated-${id}`}>Deprecated</Tooltip>}
    >
      <Link
        className={classNames('text-muted', { active: isActive })}
        to={fields.slug}
      >
        {frontmatter.title}
      </Link>
    </OverlayTrigger>
  ) : (
    <Link
      className={classNames({ active: isActive })}
      to={fields.slug}
    >
      {frontmatter.title}
    </Link>
  );

  return (
    <li {...props} className="d-flex align-items-center">
      {linkNode}
    </li>
  );
}

ComponentNavItem.propTypes = {
  id: PropTypes.string.isRequired,
  fields: PropTypes.shape({
    slug: PropTypes.string.isRequired,
  }).isRequired,
  frontmatter: PropTypes.shape({
    title: PropTypes.string.isRequired,
    status: PropTypes.string,
  }).isRequired,
  isActive: PropTypes.bool,
};

ComponentNavItem.defaultProps = {
  isActive: false,
};

export type MenuComponentListTypes = {
  children: React.ReactNode,
};

function MenuComponentList({ children }: MenuComponentListTypes) {
  return (
    <div className="pgn-doc__menu-component-list">{children}</div>
  );
}

MenuComponentList.propTypes = {
  children: PropTypes.node.isRequired,
};

export interface IMenuComponentListCategory {
  children: React.ReactNode,
  title: string,
}

function MenuComponentListCategory({ children, title }: IMenuComponentListCategory) {
  return (
    <div className="pgn-doc__menu-component-list-category">
      <h3 className="h4">{title}</h3>
      {children}
    </div>
  );
}

const handlePlaygroundClick = () => sendUserAnalyticsEvent(PLAYGROUND_EVENTS.LINK_CLICKED);

const handleContrastCheckerClick = () => sendUserAnalyticsEvent(CONTRAST_CHECKER_CLICKED_EVENT);

MenuComponentListCategory.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

interface IMenuQueryComponents {
  categories: Array<{
    fieldValue: string,
    nodes: Array<IComponentNavItem>,
  }>,
  all: Array<IComponentNavItem>
}

function Menu() {
  const {
    settings,
    handleSettingsChange,
  } = useContext(SettingsContext);
  const { pathname } = useLocation();
  const { components } = useStaticQuery(menuQuery);
  const { categories }: IMenuQueryComponents = components;

  return (
    <div className="pgn-doc__menu">
      <h2 className="pgn-doc__menu-title">Theme</h2>
      <div className="pgn-doc__menu-btn--group">
        <ButtonGroup>
          {THEMES.map(({ id, label }) => (
            <Button
              key={id}
              variant={settings.theme === id ? 'primary' : 'outline-primary'}
              size="sm"
              onClick={() => handleSettingsChange('theme', id)}
              {...settings.theme === id ? { 'data-autofocus': true } : {}}
            >
              {label}
            </Button>
          ))}
        </ButtonGroup>
      </div>
      <Search />
      <div className="pgn-doc__menu-items">
        <Collapsible
          styling="basic"
          title="Guides"
          defaultOpen={pathname.startsWith('/guides')}
        >
          <ul className="list-unstyled">
            <li>
              <Link
                className={classNames({ active: pathname.endsWith('getting-started') })}
                to="/guides/getting-started"
              >
                Getting started
              </Link>
            </li>
            <li>
              <Hyperlink
                destination="https://openedx.atlassian.net/wiki/spaces/BPL/pages/1773502564/Component+Contribution+Process"
                target="_blank"
              >
                Contributing
              </Hyperlink>
            </li>
          </ul>
        </Collapsible>
        <Collapsible
          styling="basic"
          title="Foundations"
          defaultOpen={pathname.startsWith('/foundations')}
        >
          <ul className="list-unstyled foundations-list">
            {FOUNDATION_PAGES.map(({ label, path }) => (
              <li key={path}>
                <Link
                  className={classNames({ active: pathname.endsWith(path) })}
                  to={path}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </Collapsible>
        <Collapsible
          styling="basic"
          title="Tools"
          defaultOpen={pathname.startsWith('/tools') || pathname.startsWith('/insights')}
        >
          <ul className="list-unstyled foundations-list">
            <li>
              <Link
                className={classNames({ active: pathname.endsWith('insights') })}
                to="/insights"
              >
                Usage Insights
              </Link>
            </li>
            <li>
              <Link to="/playground" onClick={handlePlaygroundClick}>
                Playground
                <Badge className="ms-1" variant="warning">Beta</Badge>
              </Link>
            </li>
            <li>
              <Link
                className={classNames({ active: pathname.endsWith('component-generator') })}
                to="/tools/component-generator"
              >
                Component Generator
              </Link>
            </li>
            <li>
              <Hyperlink
                destination="https://webaim.org/resources/contrastchecker"
                target="_blank"
                externalLinkAlternativeText="Contrast checker page"
                externalLinkTitle="Contrast checker"
                onClick={handleContrastCheckerClick}
              >
                Contrast Checker
              </Hyperlink>
            </li>
          </ul>
        </Collapsible>
        <MenuComponentList>
          {categories.map(({ fieldValue, nodes }) => (
            <Collapsible
              className="pgn-doc__menu-component--list-category"
              key={fieldValue}
              styling="basic"
              title={fieldValue}
              defaultOpen={nodes.some(({ fields }) => fields.slug === pathname)}
            >
              <ul className="list-unstyled">
                {nodes.map((node) => (
                  <ComponentNavItem
                    key={node.id}
                    {...node}
                    isActive={pathname === node.fields.slug}
                  />
                ))}
              </ul>
            </Collapsible>
          ))}
        </MenuComponentList>
      </div>
      <Hyperlink
        destination="https://www.npmjs.com/package/@openedx/paragon"
        externalLinkAlternativeText="npm Paragon package page"
        externalLinkTitle="Paragon npm"
        target="_blank"
      >
        <Image
          className="me-2"
          src="https://img.shields.io/npm/v/@openedx/paragon.svg"
          alt="npm_version"
          width={94}
          height={20}
        />
      </Hyperlink>
    </div>
  );
}

export default Menu;
