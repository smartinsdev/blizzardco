-- CreateTable
CREATE TABLE `accounts` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(16) NOT NULL DEFAULT '',
    `password` VARCHAR(16) NULL DEFAULT '',
    `email` VARCHAR(100) NULL DEFAULT '',
    `state` BIGINT NULL,
    `earthID` VARCHAR(20) NOT NULL DEFAULT '',
    `question` VARCHAR(100) NULL,
    `answer` VARCHAR(30) NULL,
    `country` VARCHAR(110) NULL,
    `city` VARCHAR(100) NULL,
    `ip` VARCHAR(100) NULL,
    `phone` VARCHAR(15) NULL,
    `online` TINYINT NULL DEFAULT 0,
    `name` VARCHAR(16) NULL DEFAULT '',
    `entityId` BIGINT UNSIGNED NULL DEFAULT 0,
    `macs` VARCHAR(220) NULL,
    `bannedId` BIGINT NULL DEFAULT 2,
    `code` VARCHAR(255) NULL,
    `mobileNumber` VARCHAR(255) NULL,
    `securityCode` VARCHAR(255) NULL,
    `creation` DATETIME(6) NULL,
    `hwid` VARCHAR(255) NULL,

    UNIQUE INDEX `f43f43`(`id`),
    UNIQUE INDEX `accounts_username_key`(`username`),
    INDEX `ggg`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `accounts_copy2` (
    `ID` BIGINT NOT NULL AUTO_INCREMENT,
    `Username` VARCHAR(16) NOT NULL DEFAULT '',
    `Password` VARCHAR(16) NULL DEFAULT '',
    `Email` VARCHAR(100) NULL DEFAULT '',
    `State` BIGINT NULL,
    `EarthID` VARCHAR(20) NOT NULL DEFAULT '',
    `Question` VARCHAR(100) NULL,
    `answer` VARCHAR(30) NULL,
    `Country` VARCHAR(110) NULL,
    `City` VARCHAR(100) NULL,
    `IP` VARCHAR(100) NULL,
    `phone` VARCHAR(15) NULL,
    `Online` TINYINT NULL DEFAULT 0,
    `Name` VARCHAR(16) NULL DEFAULT '',
    `EntityID` BIGINT UNSIGNED NULL DEFAULT 0,
    `macs` VARCHAR(220) NULL,
    `BannedID` BIGINT NULL DEFAULT 2,
    `Code` VARCHAR(255) NULL,
    `MobileNumber` VARCHAR(255) NULL,
    `SecurityCode` VARCHAR(255) NULL,
    `Creation` DATETIME(6) NULL,
    `HWID` VARCHAR(255) NULL,

    UNIQUE INDEX `f43f43`(`ID`),
    INDEX `ggg`(`Username`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `addlottery` (
    `EntityID` INTEGER NULL,
    `EntityName` VARCHAR(50) NULL,
    `Map` VARCHAR(20) NULL,
    `X` VARCHAR(20) NULL,
    `Y` VARCHAR(20) NULL,
    `Date` CHAR(200) NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `arena` (
    `EntityID` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `EntityName` VARCHAR(45) NOT NULL DEFAULT '',
    `ArenaPoints` INTEGER UNSIGNED NULL DEFAULT 0,
    `ActivityPoints` INTEGER UNSIGNED NULL DEFAULT 0,
    `TodayWin` INTEGER UNSIGNED NULL DEFAULT 0,
    `TodayBattles` INTEGER UNSIGNED NULL DEFAULT 0,
    `TotalWin` INTEGER UNSIGNED NULL DEFAULT 0,
    `TotalLose` INTEGER UNSIGNED NULL DEFAULT 0,
    `CurrentHonor` INTEGER UNSIGNED NULL DEFAULT 0,
    `HistoryHonor` INTEGER UNSIGNED NULL DEFAULT 0,
    `LastSeasonRank` INTEGER UNSIGNED NULL DEFAULT 0,
    `Level` INTEGER UNSIGNED NULL DEFAULT 0,
    `Class` INTEGER UNSIGNED NULL DEFAULT 0,
    `ArenaPointFill` BIGINT UNSIGNED NULL DEFAULT 0,
    `Model` BIGINT UNSIGNED NULL DEFAULT 0,
    `LastSeasonArenaPoints` BIGINT UNSIGNED NULL DEFAULT 0,
    `LastSeasonWin` INTEGER UNSIGNED NULL DEFAULT 0,
    `LastSeasonLose` INTEGER UNSIGNED NULL DEFAULT 0,
    `Hair` BIGINT NULL,
    `Head` BIGINT NULL,
    `Garment` BIGINT NULL,
    `LeftWeapon` BIGINT NULL,
    `LefttWeaponAccessory` BIGINT NULL,
    `RightWeapon` BIGINT NULL,
    `RightWeaponAccessory` BIGINT NULL,
    `MountArmor` BIGINT NULL,
    `Armor` BIGINT NULL,
    `Wing` BIGINT NULL,
    `WingPlus` BIGINT NULL,
    `Title` BIGINT NULL,
    `Flag` BIGINT NULL,
    `GuildName` VARCHAR(40) NULL,
    `Frame` INTEGER NULL,

    UNIQUE INDEX `myIndex`(`EntityID`),
    PRIMARY KEY (`EntityID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `arenareward` (
    `EntityID` INTEGER NULL,
    `EntityName` VARCHAR(45) NULL,
    `RankPlayers` INTEGER NULL,
    `CPs` INTEGER NULL,
    `Loggs` CHAR(200) NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `atributes` (
    `EntityID` INTEGER NOT NULL,
    `EntityName` VARCHAR(20) NULL,
    `VIPLevelStart` CHAR(200) NULL,
    `ExpireVIP` BIGINT NULL,

    PRIMARY KEY (`EntityID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `banip` (
    `IP` VARCHAR(255) NOT NULL DEFAULT '',
    `Hours` BIGINT NULL,
    `StartBan` BIGINT NULL,

    PRIMARY KEY (`IP`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `banmac` (
    `UID` BIGINT NOT NULL,
    `username` VARCHAR(16) NOT NULL DEFAULT '',
    `Hours` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `StartBan` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `Reason` VARCHAR(255) NOT NULL DEFAULT '',
    `Mac` VARCHAR(255) NULL,
    `IP` VARCHAR(255) NULL,

    PRIMARY KEY (`UID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `banned` (
    `UID` BIGINT NOT NULL,
    `username` VARCHAR(16) NOT NULL DEFAULT '',
    `Hours` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `StartBan` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `Reason` VARCHAR(255) NOT NULL DEFAULT '',

    PRIMARY KEY (`UID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chatbanned` (
    `EntityID` INTEGER NOT NULL,
    `EntityName` VARCHAR(20) NULL,
    `Reason` CHAR(255) NULL,
    `Hours` VARCHAR(20) NULL,
    `StartBan` CHAR(200) NULL,
    `Date` CHAR(20) NULL,

    PRIMARY KEY (`EntityID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `citywar` (
    `Name` VARCHAR(50) NULL,
    `City` CHAR(255) NULL,
    `ParticipantsCount` INTEGER NULL,
    `Date` CHAR(255) NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `claimitems` (
    `ItemUID` BIGINT NOT NULL DEFAULT 0,
    `Date` BIGINT NULL,
    `ConquerPointsCost` INTEGER NULL,
    `OwnerUID` BIGINT NULL,
    `OwnerName` VARCHAR(45) NULL,
    `GainerUID` BIGINT NULL,
    `GainerName` VARCHAR(45) NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `clans` (
    `Identifier` BIGINT NOT NULL,
    `LeaderId` INTEGER NOT NULL,
    `Name` VARCHAR(32) NOT NULL,
    `Fund` BIGINT NULL,
    `Announcement` VARCHAR(255) NOT NULL,
    `BPTower` INTEGER NOT NULL,
    `Level` INTEGER NOT NULL,
    `LeaderName` VARCHAR(32) NOT NULL,
    `polekeeper` INTEGER NOT NULL,

    UNIQUE INDEX `myIndex`(`Identifier`),
    PRIMARY KEY (`Identifier`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `colog_logins` (
    `ID` INTEGER NULL,
    `Date` DATETIME(0) NULL,
    `UserID` INTEGER NULL,
    `ActionType` INTEGER NULL,
    `IPAddress` VARCHAR(20) NULL,
    `MacAddress` CHAR(200) NULL,
    `HWID` CHAR(200) NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `configuration` (
    `EntityID` BIGINT UNSIGNED NOT NULL DEFAULT 1000000,
    `Server` VARCHAR(30) NOT NULL DEFAULT '',
    `PlayersOnline` BIGINT NULL DEFAULT 0,
    `Online` VARCHAR(255) NULL,
    `GWWinner` VARCHAR(255) NULL,
    `EGWWinner` VARCHAR(255) NULL,
    `ClanWinner` VARCHAR(255) NULL,
    `MaxOnline` VARCHAR(255) NULL,
    `LastChar` VARCHAR(255) NULL,
    `CTFWinner` VARCHAR(255) NULL,
    `CityWar` VARCHAR(255) NULL,

    PRIMARY KEY (`Server`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cpanal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Website` VARCHAR(255) NULL,
    `Title` TEXT NULL,
    `URL` VARCHAR(255) NULL,
    `VERSION` BIGINT NULL,
    `Drop` BIGINT NULL,
    `Max_Level` BIGINT NULL,
    `Max_Plus` BIGINT NULL,
    `LATEST_VIDEOS` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cq_generator` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mapid` INTEGER NOT NULL DEFAULT 0,
    `bound_x` INTEGER NOT NULL DEFAULT 0,
    `bound_y` INTEGER NOT NULL DEFAULT 0,
    `bound_cx` INTEGER NOT NULL DEFAULT 0,
    `bound_cy` INTEGER NOT NULL DEFAULT 0,
    `maxnpc` INTEGER NOT NULL DEFAULT 0,
    `rest_secs` INTEGER NOT NULL DEFAULT 0,
    `max_per_gen` INTEGER NOT NULL DEFAULT 0,
    `npctype` INTEGER NOT NULL DEFAULT 0,
    `timer_begin` INTEGER NOT NULL DEFAULT 0,
    `timer_end` INTEGER NOT NULL DEFAULT 0,
    `born_x` INTEGER NOT NULL DEFAULT 0,
    `born_y` INTEGER NOT NULL DEFAULT 0,
    `mask` TINYINT NOT NULL DEFAULT 0,
    `cluster_type` TINYINT UNSIGNED NOT NULL DEFAULT 0,
    `attribute` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `data` INTEGER NOT NULL DEFAULT 0,

    INDEX `mapid`(`mapid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `deityland` (
    `EntityID` INTEGER NOT NULL,
    `EntityName` VARCHAR(30) NULL,
    `Jades` VARCHAR(40) NULL,
    `MobsKiller` VARCHAR(40) NULL,
    `RankPlayers` VARCHAR(40) NULL,

    PRIMARY KEY (`EntityID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `detaineditems` (
    `ItemUID` BIGINT NOT NULL,
    `OwnerUID` BIGINT NULL,
    `Date` BIGINT NULL,
    `ConquerPointsCost` INTEGER NULL,
    `OwnerName` VARCHAR(45) NULL,
    `GainerUID` BIGINT NULL,
    `GainerName` VARCHAR(45) NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dropitem` (
    `EntityID` INTEGER NOT NULL,
    `EntityName` VARCHAR(45) NULL,
    `InfoItem` CHAR(255) NULL,
    `Map` INTEGER NULL,
    `X` INTEGER NULL,
    `Y` INTEGER NULL,
    `Date` CHAR(65) NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `flooritemdrop` (
    `EntityID` INTEGER NOT NULL,
    `EntityName` VARCHAR(45) NULL,
    `InfoItem` CHAR(255) NULL,
    `Map` INTEGER NULL,
    `X` INTEGER NULL,
    `Y` INTEGER NULL,
    `Date` CHAR(65) NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `genesiscoin` (
    `EntityID` INTEGER NULL,
    `EntityName` VARCHAR(40) NULL,
    `Type` CHAR(250) NULL,
    `Amount` VARCHAR(60) NULL,
    `Date` CHAR(60) NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `log_payments` (
    `username` VARCHAR(255) NULL,
    `name` VARCHAR(255) NULL,
    `log` VARCHAR(5000) NULL,
    `date` DATETIME(0) NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `loggsdeity` (
    `EntityName` VARCHAR(30) NULL,
    `HowMuch` VARCHAR(40) NULL,
    `Date` CHAR(200) NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `loggsitems` (
    `EntityID` INTEGER NULL,
    `GainerName` VARCHAR(20) NULL,
    `OwnerName` VARCHAR(20) NULL,
    `Date` CHAR(255) NULL,
    `Item` CHAR(255) NULL,
    `ClaimConquerPoints` VARCHAR(20) NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `loggsredeemgear` (
    `EntityID` INTEGER NULL,
    `GainerName` VARCHAR(20) NULL,
    `OwnerName` VARCHAR(20) NULL,
    `Date` CHAR(255) NULL,
    `Item` CHAR(255) NULL,
    `ClaimConquerPoints` VARCHAR(20) NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `macs` (
    `UID` INTEGER NOT NULL,
    `MacAddress` CHAR(200) NULL,
    `LastUpdate` CHAR(200) NULL,
    `ComputerIdlen` VARCHAR(20) NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `monsterspawns` (
    `id` INTEGER NOT NULL,
    `mapid` INTEGER NOT NULL DEFAULT 0,
    `bound_x` INTEGER NULL DEFAULT 0,
    `bound_y` INTEGER NULL DEFAULT 0,
    `bound_cx` INTEGER NULL,
    `bound_cy` INTEGER NULL,
    `maxnpc` INTEGER NULL,
    `rest_secs` INTEGER NULL,
    `max_per_gen` INTEGER NULL,
    `npctype` INTEGER NULL,
    `timer_begin` INTEGER NULL,
    `timer_end` INTEGER NULL,
    `born_x` INTEGER NULL,
    `born_y` INTEGER NULL,

    INDEX `mapid`(`mapid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `monstertime` (
    `UID` INTEGER NULL,
    `Name` CHAR(60) NULL,
    `Hour` VARCHAR(40) NULL,
    `Min` VARCHAR(40) NULL,
    `MapID` INTEGER NULL,
    `X` VARCHAR(40) NULL,
    `Y` VARCHAR(40) NULL,
    `DyMap` VARCHAR(40) NULL,
    `Type` VARCHAR(40) NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `msgbet` (
    `EntityID` INTEGER NULL,
    `Name` VARCHAR(30) NULL,
    `Win` CHAR(40) NULL,
    `Bet` CHAR(40) NULL,
    `BetSystem` CHAR(50) NULL,
    `Date` CHAR(200) NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `msglog` (
    `Name` VARCHAR(20) NOT NULL DEFAULT '',
    `NameTarget` VARCHAR(20) NOT NULL DEFAULT '0',
    `Message` CHAR(255) NOT NULL DEFAULT '0',
    `Mesh` VARCHAR(20) NULL,
    `EntityTarget` VARCHAR(20) NULL,
    `Frame` VARCHAR(20) NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `msgmessage` (
    `Date` CHAR(255) NULL,
    `EntityID` INTEGER NULL,
    `EntityName` VARCHAR(255) NULL,
    `Map` INTEGER NULL,
    `X` INTEGER NULL,
    `Y` INTEGER NULL,
    `ChatType` INTEGER NULL,
    `ChatTarget` CHAR(20) NULL,
    `Value` CHAR(255) NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `namechange` (
    `EntityID` INTEGER NOT NULL,
    `OldName` VARCHAR(25) NULL,
    `NewName` VARCHAR(25) NULL,
    `Date` CHAR(255) NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `navidad` (
    `EntityID` VARCHAR(25) NULL,
    `EntityName` VARCHAR(25) NULL,
    `Type` CHAR(50) NULL,
    `Amount` VARCHAR(50) NULL,
    `Date` CHAR(50) NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payments` (
    `username` VARCHAR(255) NULL,
    `txn_id` BIGINT NOT NULL AUTO_INCREMENT,
    `item_number` INTEGER NULL,
    `item_name` VARCHAR(255) NULL,
    `Date` DATETIME(0) NULL,
    `claimed` INTEGER NULL DEFAULT 0,
    `payment_gross` VARCHAR(255) NULL,
    `mc_gross` VARCHAR(255) NULL,
    `payer_id` VARCHAR(255) NULL,
    `payment_date` VARCHAR(255) NULL,
    `payment_status` VARCHAR(255) NULL,

    PRIMARY KEY (`txn_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `report` (
    `EntityID` INTEGER NULL,
    `Name` VARCHAR(20) NULL,
    `Report` CHAR(200) NULL,
    `Date` CHAR(200) NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `servers` (
    `Name` VARCHAR(16) NOT NULL DEFAULT '',
    `IP` VARCHAR(16) NULL,
    `Port` INTEGER UNSIGNED NULL,
    `TransferKey` VARCHAR(64) NOT NULL,
    `TransferSalt` VARCHAR(64) NOT NULL,

    PRIMARY KEY (`Name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shop` (
    `name_item` VARCHAR(255) NOT NULL,
    `value_item` VARCHAR(255) NOT NULL,
    `desc_item` TEXT NULL,
    `img_item` VARCHAR(100) NULL,
    `product_id` INTEGER NOT NULL AUTO_INCREMENT,
    `button_id` VARCHAR(100) NULL,

    PRIMARY KEY (`product_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shopvendor` (
    `Vendor` VARCHAR(20) NULL,
    `VendorName` VARCHAR(30) NULL,
    `Buying` VARCHAR(20) NULL,
    `BuyingName` VARCHAR(30) NULL,
    `Cost` CHAR(10) NULL,
    `Items` CHAR(255) NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `topgarments` (
    `EntityID` BIGINT NOT NULL,
    `Name` CHAR(255) NOT NULL DEFAULT '',
    `Valor` CHAR(255) NOT NULL DEFAULT '0',

    PRIMARY KEY (`EntityID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `topservers` (
    `EntityID` BIGINT NOT NULL,
    `Name` CHAR(255) NOT NULL DEFAULT '',
    `Money` CHAR(255) NOT NULL DEFAULT '0',
    `CPs` CHAR(255) NOT NULL DEFAULT '0',
    `GuildName` CHAR(255) NULL,
    `MoneySave` CHAR(255) NOT NULL DEFAULT '0',
    `Mesh` SMALLINT NOT NULL DEFAULT 0,
    `Avatar` SMALLINT NOT NULL DEFAULT 0,
    `GenesisCoin` CHAR(255) NOT NULL,
    `AutoHunting` CHAR(255) NOT NULL DEFAULT '0',
    `Status` CHAR(255) NOT NULL DEFAULT '0',

    PRIMARY KEY (`EntityID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tournament_rewards` (
    `CTFChampionConquerPoints` INTEGER NULL,
    `CTF2ndConquerPoints` INTEGER NULL,
    `CTF3ndConquerPoints` INTEGER NULL,
    `CTFChampionMoney` INTEGER NULL,
    `CTF3ndMoney` INTEGER NULL,
    `CTF2ndMoney` INTEGER NULL,
    `RewardEventsCityCPs` INTEGER NULL,
    `RewardEventsCityMoney` INTEGER NULL,
    `RewardMoneyGuildwar` INTEGER NULL,
    `RewardCPsGuildwar` INTEGER NULL,
    `RewardCPsDragonWar` INTEGER NULL,
    `PremioHombre` INTEGER NULL,
    `RewardCPsElitetop1` INTEGER NULL,
    `RewardCPsElitetop2` INTEGER NULL,
    `RewardCPsElitetop3` INTEGER NULL,
    `RewardCPsElitetop8` INTEGER NULL,
    `TeamPKTop1` INTEGER NULL,
    `TeamPKTop2` INTEGER NULL,
    `TeamPKTop3` INTEGER NULL,
    `TeamPKTop8` INTEGER NULL,
    `TopBoss1` INTEGER NULL,
    `TopBoss2` INTEGER NULL,
    `TopBoss3` INTEGER NULL,
    `SpouseWar` INTEGER NULL,
    `CityWar` INTEGER NULL,
    `LastPatchLink` CHAR(255) NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `viplevel` (
    `EntityID` INTEGER NOT NULL,
    `EntityName` VARCHAR(20) NULL,
    `VIPLevelStart` CHAR(200) NULL,
    `ExpireVIP` BIGINT NULL,

    PRIMARY KEY (`EntityID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wadrobe` (
    `EntityID` INTEGER NULL,
    `EntityName` VARCHAR(25) NULL,
    `ItemLoggs` CHAR(255) NULL,
    `Date` CHAR(200) NULL,
    `ActionID` CHAR(15) NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

