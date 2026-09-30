// Hello world. The Worker itself is irrelevant to the bug: it only needs to
// exist, be connected to Workers Builds, and have no `previews` block.
export default {
  fetch() {
    return new Response("hello from previews-repro-demo\n");
  },
};
