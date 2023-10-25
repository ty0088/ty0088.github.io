SELECT songs.name FROM songs, artists
WHERE songs.artist_id = artists.id
AND artists.name = 'Post Malone';


--SELECT * FROM artists
--    JOIN songs ON artists.id = songs.artist_id
--    WHERE artists.name = 'Post Malone';

--In 6.sql, write a SQL query that lists the names of songs that are by Post Malone.
--Your query should output a table with a single column for the name of each song.
--You should not make any assumptions about what Post Malone’s artist_id is.