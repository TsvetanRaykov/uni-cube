const hbsHelpers = {
  select: function (value, options) {
    return options.fn()
      .split('\n')
      .map(function (v) {
        var t = 'value="' + value + '"'
        return RegExp(t).test(v) ? v.replace(t, t + ' selected="selected"') : v
      })
      .join('\n')
  }
}

module.exports = hbsHelpers
