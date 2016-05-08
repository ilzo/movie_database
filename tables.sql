CREATE TABLE IF NOT EXISTS `movies` (
`ID` INTEGER PRIMARY KEY NOT NULL auto_increment,
`title` text CHARACTER SET utf8 COLLATE utf8_swedish_ci,
`director` text CHARACTER SET utf8 COLLATE utf8_swedish_ci,
`release_year` INTEGER,
`genre` text CHARACTER SET utf8 COLLATE utf8_swedish_ci,
`image` TEXT NOT NULL,
`description` text CHARACTER SET utf8 COLLATE utf8_swedish_ci,
FULLTEXT KEY `description` (`description`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `reviews` (
`ID` INTEGER PRIMARY KEY NOT NULL auto_increment,
`movie_id` INTEGER,
`username` text NOT NULL COLLATE utf8_swedish_ci,
`grade` DOUBLE NOT NULL,
`review` text NOT NULL COLLATE utf8_swedish_ci,
`date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=100;


ALTER TABLE `reviews`
 ADD FOREIGN KEY(movie_id)
  REFERENCES movies(ID);


  
INSERT INTO `movies` (`title`, `director`, `release_year`, `genre`, `image`, `description`) VALUES
('Terminator', 'James Cameron', 1984, 'Action/Sci-Fi', 'terminator.jpg', 'A human-looking indestructible cyborg is sent from 2029 to 1984 to assassinate a waitress, whose unborn son will lead humanity in a war against the machines, while a soldier from that war is sent to protect her at all costs.');  

INSERT INTO `movies` (`title`, `director`, `release_year`, `genre`, `image`, `description`) VALUES
('Home Alone', 'Chris Columbus', 1990, 'Comedy/Family', 'homealone.jpg', 'An 8-year old troublemaker must protect his home from a pair of burglars when he is accidentally left home alone by his family during Christmas vacation.');

INSERT INTO `movies` (`title`, `director`, `release_year`, `genre`, `image`, `description`) VALUES
('Beverly Hills Cop', 'Martin Brest', 1984, 'Action/Comedy', 'beverlyhillscop.jpg', 'A freewheeling Detroit cop pursuing a murder investigation finds himself dealing with the very different culture of Beverly Hills.');

INSERT INTO `movies` (`title`, `director`, `release_year`, `genre`, `image`, `description`) VALUES
('Back to The Future', 'Robert Zemeckis', 1985, 'Adventure/Comedy', 'backtothefuture.jpg', 'A young man is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his friend, Dr. Emmett Brown, and must make sure his high-school-age parents unite in order to save his own existence.');

INSERT INTO `movies` (`title`, `director`, `release_year`, `genre`, `image`, `description`) VALUES
('Lord of The Rings - The Fellowship of The Ring', 'Peter Jackson', 2001, 'Fantasy/Adventure', 'lotr.jpg', 'A meek Hobbit and eight companions set out on a journey to destroy the One Ring and the Dark Lord Sauron.');