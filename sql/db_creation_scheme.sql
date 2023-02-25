-- Creating the dB

CREATE DATABASE forecast_watch;
USE forecast_watch;
CREATE TABLE `locations` (
    `id` varchar(64) NOT NULL,
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `coordinates` POINT NOT NULL,
    `name` varchar(64) NOT NULL,
    PRIMARY KEY (`id`)
);
CREATE TABLE `users` (
    `id` varchar(64) NOT NULL,
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `user_name` varchar(64) NOT NULL,
    PRIMARY KEY (`id`)
);
CREATE TABLE `watch_points` (
    `id` varchar(64) NOT NULL,
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `location_id` varchar(64) NOT NULL,
    `user_id` varchar(64) NOT NULL,
    FOREIGN KEY (`location_id`) REFERENCES `locations`(`id`),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`),
    PRIMARY KEY (`id`)
);

-- Seeding the DB with data

INSERT INTO locations (id, name, coordinates)
values(
		"1",
		"Mogdalor marina Tel Aviv",
		POINT(32.088156, 34.763634)
	);
INSERT INTO locations (id, name, coordinates)
values("2", "Imsouane", POINT(30.837099, - 9.815673));
INSERT INTO users (id, user_name)
values("1", "Noa");
INSERT INTO users (id, user_name)
values("2", "Raz");
INSERT INTO watch_points (id, user_id, location_id)
values("1-1_uniuque_id", "1", "1");
INSERT INTO watch_points (id, user_id, location_id)
values("2-1_uniuque_id", "2", "1");
INSERT INTO watch_points (id, user_id, location_id)
values("2-2_uniuque_id", "2", "2");