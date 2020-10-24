const DEFAULT_CONFIG = {
  PORT: process.env.PORT || 3000,
  env: 'prod',
};

const arguments = process.argv.slice(2);
const config = arguments.reduce((acc, argument) => {
  const matched = argument.match(/^-(?<name>\w+)=(?<value>\w+)$/);
  if (matched) acc[matched.groups.name] = matched.groups.value;
  return acc;
}, {});

Object.assign(module.exports, DEFAULT_CONFIG, config);
