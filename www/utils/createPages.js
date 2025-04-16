const path = require('path');
const fs = require('fs');
const { INSIGHTS_PAGES } = require('../src/config');
const componentsUsage = require('../src/utils/componentsUsage');

const componentPageTemplate = path.resolve(__dirname, '../src/templates/component-page-template.tsx');
const defaultMdxPageTemplate = path.resolve(__dirname, '../src/templates/default-mdx-page-template.tsx');

async function createPages(graphql, actions, reporter) {
  // Destructure the createPage function from the actions object
  const { createPage, createRedirect } = actions;
  // MDX transforms markdown generated by gatsby-transformer-react-docgen
  // This query filters out all of those markdown nodes and assumes all others
  // are for page creation purposes.
  const result = await graphql(`
    query {
      allMdx(
        filter: {
          parent: {
            internal: { owner: { nin: "gatsby-transformer-react-docgen" } }
          }
        }
      ) {
        edges {
          node {
            id
            fields {
              slug
              source
            }
            frontmatter {
              components
            }
            internal {
              contentFilePath
            }
          }
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading createPages query');
  }
  // Create component detail pages.
  const pages = result.data.allMdx.edges;

  // you'll call `createPage` for each result
  for (const { node } of pages) {
    const githubEditPath = `https://github.com/openedx/paragon/edit/master/src${node.internal.contentFilePath.split('src')[1]}`;

    if (node.fields.source === 'components') {
      // Check for a _variables.scss file for this component, e.g. src/Button/_variables.scss.
      // If it exists, load the data:
      const cssVariablesData = [];
      const componentDir = path.dirname(node.internal.contentFilePath);
      const pathToComponents = fs.readdirSync(componentDir);
      pathToComponents.forEach(componentFile => {
        if (componentFile.endsWith('.scss')) {
          const fileData = fs.readFileSync(`${componentDir}/${componentFile}`, 'utf-8');
          const customCSSVariables = fileData.match(/var\((\w|-|_)*\)/g);

          customCSSVariables?.forEach(variable => {
            if (!cssVariablesData.includes(variable)) {
              cssVariablesData.push(variable);
            }
          });
        }
      });

      createPage({
        // This is the slug you created before
        // (or `node.frontmatter.slug`)
        path: node.fields.slug,
        // This layout will wrap our MDX content
        component: `${componentPageTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
        // You can use the values in this context in
        // our page layout component
        context: {
          id: node.id,
          components: node.frontmatter.components || [],
          cssVariablesData,
          componentsUsageInsights: Object.keys(componentsUsage),
          githubEditPath,
        },
      });
    }

    if (node.fields.source === 'pages') {
      createPage({
        path: node.fields.slug,
        component: `${defaultMdxPageTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
        context: {
          id: node.id,
          githubEditPath,
          frontmatter: {
            title: node.frontmatter.title,
          },
        },
      });
    }
  }

  INSIGHTS_PAGES.forEach(({ path: pagePath, tab }) => {
    const githubEditPath = 'https://github.com/openedx/paragon/edit/master/www/src/pages/insights.tsx';
    createPage({
      path: pagePath,
      component: require.resolve('../src/pages/insights.tsx'),
      context: { tab, githubEditPath },
    });
  });

  createRedirect({
    fromPath: '/playroom',
    toPath: '/playroom/index.html',
  });

  createRedirect({
    fromPath: '/playroom/preview',
    toPath: '/playroom/preview/index.html',
  });
}

module.exports = createPages;
