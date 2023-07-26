INSERT INTO [Customer] (
[UserId]		INT			 NOT NULL,
		FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
		);