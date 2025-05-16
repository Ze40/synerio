import { useEffect, useState } from "react";

import { useLoaderData, useNavigate } from "react-router";

import { authService } from "@/feat/auth/services";
import { Modal } from "@/shared/ui";
import { button } from "@/style/recipes/button";
import { FetchError } from "@/utils/fetch";

import type { Route } from "./+types/page";
import * as style from "./style";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  if (!token) {
    return { error: "Токен не найден" };
  }

  try {
    const result = await authService.confirmEmail(token);
    return { ok: true, result };
  } catch (error) {
    if (error instanceof FetchError) {
      return { error: error.message };
    }
    return { error: "Неизвестная ошибка" };
  }
};

const VerifyPage = () => {
  const data = useLoaderData();
  const [error, setError] = useState<string | null>(null);
  const [isOk, setIsOk] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (data && "error" in data) {
      setError(data.error);
      return;
    }
    if (data && "ok" in data) {
      setIsOk(data.ok);
      return;
    }
  }, [data]);

  const handleClick = () => {
    navigate("/feat");
  };

  return (
    <>
      <Modal isOpen={error !== null} isClosing={false} title="Ошибка">
        <p className={style.msg()}>{error}</p>
      </Modal>
      <Modal isOpen={isOk} isClosing={false} title={"Успех!"}>
        <div className={style.container()}>
          <p className={style.msg()}>Вы будете перенаправлены</p>
          <button
            type="button"
            className={button({ variant: "primary", size: "normal" })}
            onClick={handleClick}
          >
            Подтвердить
          </button>
        </div>
      </Modal>
    </>
  );
};

export default VerifyPage;
