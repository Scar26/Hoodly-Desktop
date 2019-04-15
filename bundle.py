import mysql.connector as SQL

DB = SQL.connect(
	host = "localhost",
	user = "root",
	passwd = ""
	)

ctx = DB.cursor()
ctx.execute("SHOW DATABASES")

if not ('city' in ctx.fetchall()):
	ctx.execute("CREATE DATABASE")
	
ctx = city.cursor()

city = SQL.connect(
		host = "localhost",
		user = "root",
		passwd = "",
		database = "city"
		)

ctx.execute("CREATE TABLE communities (name VARCHAR(255), college VARCHAR(255))")

query = "INSERT INTO communities (name,college) VALUES (%s,%s)"
entries = [("roorkee_anime","roorkee"),("roorkee_developers","roorkee"),("roorkee_literature","roorkee"),("roorkee_marvelgeeks","roorkee")]
for val in entries:
	ctx.execute(query,val)
	city.commit()

print("database created")
