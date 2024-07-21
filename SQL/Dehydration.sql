CREATE TABLE Examinations
(
    ExaminationId INT IDENTITY PRIMARY KEY,
    PatientId INT NOT NULL FOREIGN KEY REFERENCES Patients(PatientId),
    Natrium INT NOT NULL,
    CurrentWeight INT NOT NULL,
    BodyTemperature FLOAT NOT NULL,
    Vomit INT NOT NULL,
    Stool INT NOT NULL
	)

	;

	CREATE TABLE Symptoms
(
    ExaminationId INT FOREIGN KEY REFERENCES Examinations(ExaminationId),
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