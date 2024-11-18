-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Nov 11. 12:21
-- Kiszolgáló verziója: 10.4.25-MariaDB
-- PHP verzió: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `webbolt`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tablets`
--

CREATE TABLE `tablets` (
  `id` int(11) NOT NULL,
  `Nev` varchar(255) DEFAULT NULL,
  `opRendszer` varchar(255) DEFAULT NULL,
  `procOrajel` double DEFAULT NULL,
  `procMagok` int(11) DEFAULT NULL,
  `kijelzoMeret` double DEFAULT NULL,
  `kijelzoFelbontas` varchar(255) DEFAULT NULL,
  `RAM` int(11) DEFAULT NULL,
  `leiras` varchar(255) DEFAULT NULL,
  `ar` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `tablets`
--

INSERT INTO `tablets` (`id`, `Nev`, `opRendszer`, `procOrajel`, `procMagok`, `kijelzoMeret`, `kijelzoFelbontas`, `RAM`, `leiras`, `ar`) VALUES
(1, 'iPad Air', 'iOS', 2.5, 6, 10.9, '2360 x 1640', 8, 'Powerful performance with A14 Bionic chip', 599),
(2, 'Samsung Galaxy Tab S7', 'Android', 3.1, 8, 11, '2560 x 1600', 6, 'High refresh rate display, S-Pen included', 649),
(3, 'Microsoft Surface Pro 7', 'Windows', 1.3, 4, 12.3, '2736 x 1824', 8, '2-in-1 versatility, great for productivity', 749),
(4, 'Amazon Fire HD 10', 'Fire OS', 2, 4, 10.1, '1920 x 1200', 3, 'Affordable and good for media consumption', 149),
(5, 'Lenovo Tab P11 Pro', 'Android', 2.2, 8, 11.5, '2560 x 1600', 6, 'High-quality OLED display, long battery life', 499),
(6, 'Huawei MatePad Pro', 'HarmonyOS', 2.6, 8, 10.8, '2560 x 1600', 8, 'Premium design, excellent performance and display', 699);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `tablets`
--
ALTER TABLE `tablets`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `tablets`
--
ALTER TABLE `tablets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
