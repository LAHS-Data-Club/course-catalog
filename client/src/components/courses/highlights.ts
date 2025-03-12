// pretty much exactly the same as from ivys lol prolly make sure this works at some pt later

import { Course } from "../../lib/types";

// deal wiht the imploictyly enabled at some point
function generateHighlighter(
  classes: Course[],
  targetId: string,
  implicitEnabled: boolean = true
): Record<string, string> {
  const highlights = {} as Record<string, string>;
  const x = classes.find((c) => c.id === targetId);
  // i dont like this, id rahter it be reset when dept resets but idk how to do that since useeffect runs after the whole thing runs
  if (!x) return highlights;

  // Highlight futures; classes with this one as a prereq
  classes.filter((c) => {
    if (c.prerequisite?.length < 1) return false;
    if (c.prerequisite.some((p) => p === targetId))
      highlights[c.id] = "recommended-after";
  });

  // Highlight shared prereq classes (sidesteps)
  if (implicitEnabled) {
    classes.filter((c) => {
      if (c.prerequisite?.length < 1 || x.prerequisite?.length < 1)
        return false;
      if (c.prerequisite.every((l) => x.prerequisite.some((p) => p === l)))
        highlights[c.id] = "recommended-after";
    });
  }

  // Highlight all prereq classes
  if (x.prerequisite?.length > 0)
    x.prerequisite.forEach((p) => {
      highlights[p] = "recommended-before";
    });

  highlights[targetId] = "selected";
  return highlights;
}

export default generateHighlighter;
