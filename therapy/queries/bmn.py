from pydantic import BaseModel
from typing import Union, List, Optional
from queries.pool import pool


class Error(BaseModel):
    message: str


class BMNIn(BaseModel):
    title: str
    lengthy_description: str
    image_1: str
    image_2: str
    date_watched: str


class BMNOut(BaseModel):
    id: int
    title: str
    lengthy_description: str
    image_1: str
    image_2: str
    date_watched: str


class BMNRepository:
    def create_bmn(self, bmn: BMNIn) -> Union[BMNOut, Error]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our INSERT statement
                    result = db.execute(
                        """
                        INSERT INTO bmn
                            (title,
                            lengthy_description,
                            image_1,
                            image_2,
                            date_watched)
                        VALUES
                            (
                                %s, %s, %s, %s, %s
                                )
                        RETURNING id;
                        """,
                        [
                            bmn.title,
                            bmn.lengthy_description,
                            bmn.image_1,
                            bmn.image_2,
                            bmn.date_watched,
                        ],
                        print([bmn.title,
                            bmn.lengthy_description,
                            bmn.image_1,
                            bmn.image_2,
                            bmn.date_watched])
                    )
                    id = result.fetchone()[0]
                    old_data = bmn.dict()
                    return BMNOut(id=id, **old_data)
        except Exception:
            return {"message": "Create did not work"}

    def get_all(self) -> Union[Error, List[BMNOut]]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our INSERT statement
                    db.execute(
                        """
                        SELECT * FROM bmn
                        """
                    )
                    return [
                        BMNOut(
                            id=record[0],
                            title=record[1],
                            lengthy_description=record[2],
                            image_1=record[3],
                            image_2=record[4],
                            date_watched=record[5],
                        )
                        for record in db
                    ]
        except Exception:
            return {"message": "Create did not work"}

    def get_one_bmn(self, bmn_id: int) -> Optional[BMNOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM bmn
                        WHERE id = %s
                        """,
                        [bmn_id],
                    )
                    record = result.fetchone()
                    return BMNOut(
                        id=record[0],
                        title=record[1],
                        lengthy_description=record[2],
                        image_1=record[3],
                        image_2=record[4],
                        date_watched=record[5],
                    )

        except Exception as e:
            print(e)
            return {"message": "Could not view that bad movie"}

    def update_bmn(
        self, bmn_id: int, bmn: BMNIn
    ) -> Union[BMNOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE bmn
                        SET title = %s
                            , lengthy_description = %s
                            , image_1 = %s
                            , image_2 = %s
                            , date_watched = %s
                        WHERE id = %s
                        """,
                        [
                            bmn.title,
                            bmn.lengthy_description,
                            bmn.image_1,
                            bmn.image_2,
                            bmn.date_watched,
                        ],
                    )
                    old_data = bmn.dict()
                    return BMNOut(id=bmn_id, **old_data)
        except Exception as e:
            print(e)
            return {"message": "Could not update bad movie"}

    def delete_bmn(self, bmn_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DElETE FROM bmn
                        WHERE id = %s
                        """,
                        [bmn_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False
