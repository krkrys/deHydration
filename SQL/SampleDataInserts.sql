INSERT INTO Users (Name, Email, Password)
VALUES ('Jan Kowalski', 'jan.kowalski@example.com', 'haslo123'),
       ('Anna Nowak', 'anna.nowak@example.com', 'password456');

INSERT INTO Patients (Name, Surname, PhoneNumber, StandardWeight, DoctorId)
VALUES ('Piotr', 'Zieliñski', '123456789', 70, 1),
       ('Katarzyna', 'Nowak', '987654321', 60, 2);
	   
INSERT INTO Examinations (PatientId, Natrium, CurrentWeight, BodyTemperature, Vomit, Stool)
VALUES (1, 140, 68, 37.5, 0, 1),
       (2, 138, 55, 36.8, 1, 0);

INSERT INTO Symptoms (ExaminationId, GeneralAppearance, RadialPulse, Respirations, AnteriorFontanelle, SystolicBloodPressure, SkinElasticity, Eyes, Tears, MucousMembranes)
VALUES (1, 2, 1, 2, 3, 2, 1, 3, 1, 2),
       (2, 1, 2, 3, 1, 3, 2, 1, 2, 3);