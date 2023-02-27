-- Creating the dB

CREATE DATABASE forecast_watch;
USE forecast_watch;
CREATE TABLE `locations` (
    `id` varchar(64) NOT NULL,
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `coordinates` POINT NOT NULL,
    `name` varchar(64) NOT NULL,
    PRIMARY KEY (`id`),
    INDEX (`name`)
);
CREATE TABLE `users` (
    `id` varchar(64) NOT NULL,
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `username` varchar(64) NOT NULL,
    PRIMARY KEY (`id`)
);
CREATE TABLE `watch_points` (
    `id` varchar(64) NOT NULL,
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `location_id` varchar(64) NOT NULL,
    `user_id` varchar(64) NOT NULL,
    `name` varchar(64) NOT NULL,
    FOREIGN KEY (`location_id`) REFERENCES `locations`(`id`),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`),
    FOREIGN KEY (`name`) REFERENCES `locations`(`name`),
    PRIMARY KEY (`id`)
);

-- Seeding the DB with data

INSERT INTO locations (id, name, coordinates)
values(
		"1",
		"Migdalor marina Tel Aviv",
		POINT(32.088156, 34.763634)
	);
INSERT INTO locations (id, name, coordinates)
values("2", "Imsouane", POINT(30.837099, - 9.815673));
INSERT INTO users (id, username)
values("1", "noa");
INSERT INTO users (id, username)
values("2", "raz");
INSERT INTO watch_points (id, location_id, user_id, name)
values("1_1", "1", "1", "Migdalor marina Tel Aviv");
INSERT INTO watch_points (id, location_id, user_id, name)
values("1_2", "1", "2", "Migdalor marina Tel Aviv");
INSERT INTO watch_points (id, location_id, user_id, name)
values("2_2", "2", "2", "Imsouane");