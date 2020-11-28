import { Article } from "../components/Article";
import { Page } from "../components/Page";
import { ABOUT } from "../constants/text";

export default function AboutPage() {
  return (
    <Page>
      <Article post={ABOUT} hover={false} $center={true} paragraph={true} />
    </Page>
  );
}
