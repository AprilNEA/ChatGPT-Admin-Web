function hookPrisma(pkg) {
  if (pkg.name === '@nest-http/prisma') {
    pkg.version = pkg.dependencies['@prisma/client'];
  }
  // if (pkg.name === 'nestjs-prisma') {
  //   pkg.peerDependencies['@prisma/client'] = '*';
  //   pkg.devDependencies['@prisma/client'] = undefined;
  // }
  // if (pkg.name === 'prisma-extension-pagination') {
  //   pkg.peerDependencies['@prisma/client'] = '*';
  // }
  return pkg;
}

module.exports = {
  hooks: {
    readPackage: hookPrisma,
  },
};
