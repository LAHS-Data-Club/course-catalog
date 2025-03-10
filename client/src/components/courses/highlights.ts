// pretty much exactly the same as from ivys lol prolly make sure this works at some pt later
// deal wiht the imploictyly enabled at some point
function generateHighlighter(classes: any[], targetId: string, implicitEnabled: boolean = true) {
  const highlights = {};
  const x = classes.find(c => c.id === targetId);
  // i dont like this, id rahter it be reset when dept resets but idk how to do that since useeffect runs after the whole thing runs
  if (!x) return highlights;

  // Highlight futures; classes with this one as a prereq
  classes.filter(c => {
    if (c.Prerequisite?.length < 1) return false;
    if (c.Prerequisite.some(p => p === targetId))
      highlights[c.id] = "reccommended-after";
  });

  // Highlight shared prereq classes (sidesteps)
  if (implicitEnabled) {
    classes.filter(c => {
      if (c.Prerequisite?.length < 1 || x.Prerequisite?.length < 1) return false;
      if (c.Prerequisite.every(l => x.Prerequisite.some(p => p === l.id)))
        highlights[c.id] = "reccommended-after";
    });
  }

  // Highlight all prereq classes
  if (x.Prerequisite?.length > 0)
    x.Prerequisite.forEach(p => { highlights[p] = "reccommended-before"; });

  highlights[targetId] = "selected";
  return highlights;
}

export default generateHighlighter;