SELECT title FROM movies, stars, people
WHERE movies.id = stars.movie_id
AND stars.person_id = people.id
AND (name = 'Bradley Cooper' OR name = 'Jennifer Lawrence')
GROUP BY title HAVING COUNT(movies.id) > 1;


-- In 12.sql, write a SQL query to list the titles of all movies in which both Bradley Cooper and Jennifer Lawrence starred.
-- Your query should output a table with a single column for the title of each movie.
-- You may assume that there is only one person in the database with the name Bradley Cooper.
-- You may assume that there is only one person in the database with the name Jennifer Lawrence.