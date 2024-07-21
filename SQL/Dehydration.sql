CREATE DATABASE Dehydration;
GO
USE Dehydration;
GO
CREATE TABLE Users
(
	Id INT IDENTITY PRIMARY KEY,
	Name NVARCHAR(100) NOT NULL,
	Email NVARCHAR(100) NOT NULL,
	Password NVARCHAR(100) NOT NULL
);

CREATE TABLE Patients(
	PatientId int IDENTITY PRIMARY KEY,
	Name nvarchar(100) NOT NULL,
	Surname nvarchar(100) NOT NULL,
	PhoneNumber nvarchar(9) NOT NULL,
	StandardWeight int NOT NULL,
	DoctorId int NOT NULL FOREIGN KEY REFERENCES Users(Id)
	);

CREATE TABLE Examinations
(
    ExaminationId INT IDENTITY PRIMARY KEY,
    PatientId INT NOT NULL FOREIGN KEY REFERENCES Patients(PatientId),
    Natrium INT NOT NULL,
    CurrentWeight INT NOT NULL,
    BodyTemperature FLOAT NOT NULL,
    Vomit INT NOT NULL,
    Stool INT NOT NULL
);

CREATE TABLE Symptoms
(
    ExaminationId INT NOT NULL FOREIGN KEY REFERENCES Examinations(ExaminationId),
    GeneralAppearance INT NOT NULL CHECK (GeneralAppearance between 1 and 3),
    RadialPulse INT NOT NULL CHECK (RadialPulse between 1 and 3),
    Respirations INT NOT NULL CHECK (Respirations between 1 and 3),
    AnteriorFontanelle INT NOT NULL CHECK (AnteriorFontanelle between 1 and 3),
    SystolicBloodPressure INT NOT NULL CHECK (SystolicBloodPressure between 1 and 3),
    SkinElasticity INT NOT NULL CHECK (SkinElasticity between 1 and 3),
    Eyes INT NOT NULL CHECK (Eyes between 1 and 3),
    Tears INT NOT NULL CHECK (Tears between 1 and 3),
    MucousMembranes INT NOT NULL CHECK (MucousMembranes between 1 and 3)
);