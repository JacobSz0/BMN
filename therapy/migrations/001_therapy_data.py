steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE accounts (
            id SERIAL NOT NULL PRIMARY KEY,
            username VARCHAR(50) NOT NULL UNIQUE,
            email VARCHAR(200) NOT NULL UNIQUE,
            hashed_password VARCHAR(500) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE accounts;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE bmn (
            id SERIAL PRIMARY KEY NOT NULL,
            title VARCHAR(100) NOT NULL,
            lengthy_description VARCHAR(200) NOT NULL,
            image_1 VARCHAR(200),
            image_2 VARCHAR(200),
            date_watched VARCHAR(100)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE bmn;
        """,
    ]

]
