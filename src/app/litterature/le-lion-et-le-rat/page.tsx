import { lessonMetadata } from "@/components/lesson/metadata";
import { PageHeader } from "@/components/lesson/PageHeader";
import { ByLevel } from "@/components/lesson/ByLevel";
import { A1 } from "./a1";
import { A2 } from "./a2";
import { B1 } from "./b1";

const PATH = "/litterature/le-lion-et-le-rat";

export const metadata = lessonMetadata(PATH);

/* One work, a body per level (#92): the text, its words and its questions
   change with the learner's level; nothing on the page switches them. */
export default function Page() {
  return (
    <article className="prose">
      <PageHeader path={PATH} />
      <ByLevel levels={{ A1: <A1 />, A2: <A2 />, B1: <B1 /> }} />
    </article>
  );
}
