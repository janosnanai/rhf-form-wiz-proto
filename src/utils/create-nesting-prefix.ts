function createNestingPrefix(nesting?: string[]) {
  let nestingPrefix = "";

  if (nesting) {
    nestingPrefix = nesting.join(".") + (nesting.length > 0 ? "." : "");
  }

  return nestingPrefix;
}

export default createNestingPrefix;
