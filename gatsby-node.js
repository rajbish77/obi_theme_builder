exports.onCreateBabelConfig = ({ actions }) => {
    actions.setBabelPreset({
      name: `@babel/preset-react`,
      options: {
        useBuiltIns: true,
      },
    });
  
    actions.setBabelPlugin({
      name: `@babel/plugin-syntax-jsx`,
    });
  };
  