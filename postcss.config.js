module.exports = {
    plugins: {
      'postcss-cssnext': {
        features:{
          autoprefixer: false //already included with postcss
        }
      },
      'cssnano': {}
    }
  }