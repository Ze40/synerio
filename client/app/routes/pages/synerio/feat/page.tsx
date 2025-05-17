import { Plus } from "lucide-react";

import { Container } from "@/shared/ui";
import { page } from "@/style/recipes/page";

import * as style from "./style";

const FeatPage = () => {
  return (
    <main className={page()}>
      <Container>
        <button type="button" className={style.addBtn()}>
          <Plus />
          Добавить запись
        </button>
      </Container>
    </main>
  );
};

export default FeatPage;
