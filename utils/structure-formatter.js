const fs = require('fs');

const structureFormatter = (structure = [], parentPath = '', basePath) => {
  return structure.map(node => {
    const { type, name, children } = node;
    let formattedChildren = null;
    let formattedFileName = name;

    if (type === 'folder') {
      formattedChildren = structureFormatter(
        children,
        [parentPath, name].join('/')
      );
    }

    if (type === 'file') {
      formattedFileName = formattedFileName.replace('.md', '');
    }

    const path = [parentPath, name].join('/');
    return {
      type,
      name: formattedFileName,
      children: formattedChildren,
      path,
      content:
        type === 'file'
          ? fs.readFileSync([basePath, path].join(''), 'utf8')
          : ''
    };
  });
};

module.exports = {
  structureFormatter
};
