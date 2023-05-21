from fastapi import APIRouter, Depends, Response
from typing import Union, List, Optional
from queries.bmn import (
    BMNIn,
    BMNOut,
    BMNRepository,
    Error,
)

router = APIRouter()


@router.post("/bmn", response_model=Union[BMNOut, Error])
def create_bmn(bmn: BMNIn, repo: BMNRepository = Depends()):
    return repo.create_bmn(bmn)


@router.get("/bmn", response_model=Union[List[BMNOut], Error])
def get_all(
    repo: BMNRepository = Depends(),
):
    return repo.get_all()


@router.get("/bmn/{bmn_id}", response_model=Optional[BMNOut])
def get_one_bmn(
    bmn_id: int,
    response: Response,
    repo: BMNRepository = Depends(),
) -> BMNOut:
    bmn = repo.get_one_bmn(bmn_id)
    if bmn is None:
        response.status_code = 404
    return bmn


@router.put("/bmn/{bmn_id}", response_model=Union[BMNOut, Error])
def update_bmn(
    bmn_id: int,
    bmn: BMNIn,
    repo: BMNRepository = Depends(),
) -> Union[Error, BMNOut]:
    return repo.update_bmn(bmn_id, bmn)


@router.delete("/bmn/{bmn_id}", response_model=bool)
def delete_bmn(
    bmn_id: int,
    repo: BMNRepository = Depends(),
) -> bool:
    return repo.delete_bmn(bmn_id)