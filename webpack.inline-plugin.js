const HtmlWebpackPlugin = require('html-webpack-plugin');

class InlineScriptPlugin {
  getInlinedTag(publicPath, assets, tag) {
    if (tag.tagName !== 'script' || !(tag.attributes && tag.attributes.src)) {
      return tag;
    }
    const scriptName = publicPath
      ? tag.attributes.src.replace(publicPath, '')
      : tag.attributes.src;
    const asset = assets[scriptName];
    if (asset == null) {
      throw `Cannot find asset of ${tag.attributes.src}`;
    }
    return {tagName: 'script', innerHTML: asset.source(), closeTag: true};
  }

  apply(compiler) {
    let publicPath = compiler.options.output.publicPath || '';
    if (publicPath && !publicPath.endsWith('/')) {
      publicPath += '/';
    }
    compiler.hooks.compilation.tap('InlineScriptPlugin', (compilation) => {
      const tagFunction = (tag) => this.getInlinedTag(publicPath, compilation.assets, tag);
      const hooks = HtmlWebpackPlugin.getHooks(compilation);
      hooks.alterAssetTagGroups.tap('InlineScriptPlugin', (assets) => {
        assets.headTags = assets.headTags.map(tagFunction);
        assets.bodyTags = assets.bodyTags.map(tagFunction);
      });
    });
  }
}

module.exports = InlineScriptPlugin;
