-- DATA INSERTION ACCORDING TO MRS LAPUJADE DOCUMENTATION

-- -----
-- USERS
-- -----
TRUNCATE TABLE "Admin" RESTART IDENTITY CASCADE ;
TRUNCATE TABLE "Student" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "Professor" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "Credentials" RESTART IDENTITY CASCADE;

-- ----
-- SCHOOL YEAR
-- ----
TRUNCATE TABLE "SchoolYear" RESTART IDENTITY CASCADE;
INSERT INTO "SchoolYear"(id, label) VALUES
  (1, 'M1'),
  (2, 'M2');
ALTER SEQUENCE "SchoolYear_id_seq" RESTART WITH 3;

-- ----
-- SPECIALIZATION
-- ----
TRUNCATE TABLE "Specialization"RESTART IDENTITY CASCADE;
INSERT INTO "Specialization"(id, label, acronym, school_year_id) VALUES
  (1, 'Master 1 MIAGE','M1 MIAGE',1),
  (2, 'Master 2 OSIE','OSIE',2),
  (3, 'Master 2 SID','SID',2),
  (4, 'Master 2 SIO','SIO',2),
  (5, 'Master 2 SIS','SIS',2);
ALTER SEQUENCE "Specialization_id_seq" RESTART WITH 6;

-- ------
-- SKILLS
-- ------
TRUNCATE TABLE "Skill" RESTART IDENTITY CASCADE;
INSERT INTO "Skill"(id, label) VALUES
  (1,'Ingéniérie des SI'),
  (2,'Informatique'),
  (3,'Domaine d''application'),
  (4,'Compétences transverses'),
  (5,'Professionnalisation'),
  (6,'Gestion'),
  (7,'eSanté');
ALTER SEQUENCE "Skill_id_seq" RESTART WITH 8;

-- -----
-- SPECIALIZATION SKILL
-- -----
TRUNCATE TABLE "SpecializationSkill" CASCADE;
INSERT INTO "SpecializationSkill"(specialization_id, skill_id, optional_subjects_nb) VALUES
  (1,2,1),
  (1,4,1),

  (2,2,1),

  (3,2,1),

  (4,2,2),

  (5,2,1);

-- -----
-- SUBJECTS (M1)
-- -----
TRUNCATE TABLE "Subject" CASCADE;
TRUNCATE TABLE "SpecializationSubject" CASCADE;
INSERT INTO "Subject"(id, label,apogee_code,description,capacity,semester) VALUES
  (1,'Conduite de projet','ISI_02','Conduite de projet',100,'ANNUAL'),
  (2,'Ingéniérie du logiciel','ISI_05','Igénérie du logiciel',100,'SEMESTER_2'),
  (3,'Méthodes orientées objet d''analyse','ISI_07','Méthodes orientées objet D ''analyse',100,'ANNUAL'),
  (4,'Architecture client serveur','ISI_01','Architecture client serveur',100,'SEMESTER_2'),
  (5,'Conduite du changement','ISI_03','Conduite du changement',100,'SEMESTER_2'),
  (6,'Contrôle qualité','ISI_04','Contrôle qualité',100,'SEMESTER_2'),
  (7,'Analyse et décision en entreprise','INFO_02','Analyse et décision en entreprise',100,'SEMESTER_1'),
  (8,'Architecture web des SI','INFO_03','Architecture web des SI',100,'SEMESTER_2'),
  (9,'Achitecture des SI','INFO_04','Architecture des SI',100,'SEMESTER_1'),
  (10,'Projet de programmation','INFO_13','Projet de programmation',100,'SEMESTER_1'),
  (11,'Administration des SE','INFO_01','Administration des SE',30,'SEMESTER_1'),
  (12,'ASI Mobiles 1','INFO_05','ASI Mobiles 1',100,'SEMESTER_2'),
  (13,'BD Avancées','INFO_06','Administration des SE',100,'SEMESTER_2'),
  (14,'Bio informatique 1','INFO_07','Bio informatique 1',100,'SEMESTER_2'),
  (15,'Conception avancée des SI','INFO_08','Conception avancée des SI',100,'SEMESTER_2'),
  (16,'IHM','INFO_09','IHM',30,'SEMESTER_1'),
  (17,'Economie politique','GEO_01','Economie politique',100,'SEMESTER_1'),
  (18,'Marketing','GEO_05','Marketing',100,'SEMESTER_1'),
  (19,'Analyse des systèmes physiques','SANTE_01','Analyse des systèmes physiques',100,'SEMESTER_1'),
  (20,'Notions de base en anatomie','SANTE_04','Notions de base en anatomie',100,'SEMESTER_1'),
  (21,'Gestion financière et contrôle de gestion','GEO_03','Gestion financière et contrôle de gestion',100, 'ANNUAL'),
  (22,'Gestion de production','GEO_02','Gestion de production',100,'SEMESTER_2'),
  (23,'Marketing orienté web','GEO_06','Marketing orienté web',100,'SEMESTER_2'),
  (24,'Droit de la santé bioéthique 1','SANTE_02','Droit de la santé bioéthique 1',100,'SEMESTER_2'),
  (25,'Stratégie d''entreprise','GEO_08','Stratégie d''entreprise',100,'ANNUAL'),
  (26,'Anglais','TRANS_01','Anglais',100,'SEMESTER_1'),
  (27,'Decouverte de la recherhe','TRANS_03','Decouverte de la recherche',100,'SEMESTER_1'),
  (28,'Instrumentation biomédicale','SANTE_03','Instrumentation biomédicale',100,'SEMESTER_2'),
  (29,'Communication','TRANS_02','Communication',40,'SEMESTER_1'),
  (30,'Decouverte des laboratoires','TRANS_04','Decouverte des laboratoires',100,'SEMESTER_2'),
  (31,'Droit du travail','TRANS_05','Droit du travail',100,'SEMESTER_2'),
  (32,'Statistiques','TRANS_06','Statistiques',20,'SEMESTER_1'),
  (33,'Projet professionnel','PRO_01','Statistiques',100,'ANNUAL');

-- --
-- SPECIALIZATIONS MASTER 1 - MIAGE
-- --
INSERT INTO "SpecializationSubject"(id, specialization_id, skill_id, subject_id, is_optional) VALUES
  (1,1,1,1,FALSE),
  (2,1,1,2,FALSE),
  (3,1,1,3,FALSE),
  (4,1,1,4,TRUE), -- Ingénierie SI // Architecture client serveur (S2)
  (5,1,1,5,TRUE), -- Ingénierie SI // Conduite du changement (S2)
  (6,1,1,6,TRUE), -- Ingénierie SI // Contrôle qualité (S2)

  (7,1,2,7,FALSE),
  (8,1,2,8,FALSE),
  (9,1,2,9,FALSE),
  (10,1,2,10,FALSE),
  (11,1,2,11,TRUE), -- Informatique // Administration des SE (S1)
  (12,1,2,12,TRUE), -- Informatique // ASI Mobiles 1 (S2)
  (13,1,2,13,TRUE), -- Informatique // BD Avancées (S2)
  (14,1,2,14,TRUE), -- Informatique // Bio informatique 1 (S2)
  (15,1,2,15,TRUE), -- Informatique // Conception avancée des SI (S2)
  (16,1,2,16,TRUE), -- Informatique // IHM (S1)

  (17,1,3,17,FALSE),
  (18,1,3,18,FALSE),
  (19,1,3,19,FALSE),
  (20,1,3,20,FALSE),
  (21,1,3,21,FALSE),
  (22,1,3,22,TRUE), -- Domaine application // Gestion de production (S2)
  (23,1,3,23,TRUE), -- Domaine application // Marketing orienté web (S2)
  (24,1,3,24,TRUE), -- Domaine application // Droit de la santé bioéthique 1 (S2)

  (26,1,4,26,FALSE),
  (27,1,4,27,FALSE),
  (28,1,4,28,TRUE), -- Compétence Transverse // Instrumentation biomédicale (S2)
  (29,1,4,29,TRUE), -- Compétence Transverse // Communication (S1)
  (30,1,4,30,TRUE), -- Compétence Transverse // Decouverte des laboratoires (S2)
  (31,1,4,31,TRUE), -- Compétence Transverse // Droit du travail (S2)
  (32,1,4,32,TRUE), -- Compétence Transverse // Statistiques (S1)

  (33,1,5,33,FALSE);


-- -----
-- SUBJECTS (M2)
-- -----
INSERT INTO "Subject"(id,label,apogee_code,description,capacity,semester) VALUES
  (34,'Audit des SI','ISI_09','Audit des SI',100,'SEMESTER_1'),
  (35,'Progiciels de gestion intégrés','ISI_11','Progiciels de gestion intégrés',100,'SEMESTER_2'),
  (36,'Interopérabilité des SI (RTL)','ISI_12','Interopérabilité des SI (RTL)',100,'SEMESTER_1'),
  (37,'Conduite de projet agile','ISI_14','Conduite de projet agile',100,'SEMESTER_1'),
  (38,'Stratégie et management des SI','ISI_15','Stratégie et management des SI',100,'SEMESTER_2'),
  (39,'Ingénierie des SI en santé','ISI_16','Ingénierie des SI en santé',100,'SEMESTER_2'),
  (40,'Management de la sécurité des SI','ISI_17','Management de la sécurité des SI',100,'SEMESTER_2'),
  (41,'Workflows','ISI_19','Worflows',100,'SEMESTER_2'),
  (42,'Architecture des SI 2','INFO_18','Architecture des SI 2',100,'SEMESTER_1'),
  (43,'ASI Mobile 2','INFO_19','ASI Mobile 2',30,'SEMESTER_1'),
  (44,'Web design','INFO_31','Web design',30,'SEMESTER_1'),
  (45,'Théorie des organisations','GEO_09','Théorie des organisations',100,'SEMESTER_1'),
  (46,'eCommerce et Technologies','GEO_07','eCommerce et Technologie',100,'SEMESTER_2'),
  (47,'Anglais','TRANS_08','Anglais',100,'SEMESTER_2'),
  (48,'Environnement socio-économique','TRANS_10','Environnement socio-économique',100,'SEMESTER_2'),
  (49,'Etude de cas thématique','PRO_03','Etude de cas thématique',100,'ANNUAL'),
  (50,'Projet professionnel','PRO_04','Projet professionnel',100,'ANNUAL'),
  (51,'Outils pour la Business Intelligence','ISI_18','Outils pour la Business Intelligence',100,'SEMESTER_2'),
  (52,'Outils pour les systèmes décisionnels en entreprise','INFO_16','Outils pour la Business Intelligence',100,'SEMESTER_1'),
  (53,'Aide à la décision avancée','INFO_17','Aide à la décision avancée',100,'SEMESTER_2'),
  (54,'Modélis. des pb en management et mkg','INFO_27','Modélis. des pb en management et mkg',100,'SEMESTER_1'),
  (55,'Recherche heuristique','INFO_29','Recherche heuristique',100,'SEMESTER_2'),
  (56,'IA','INFO_23','Intelligence Artificielle',30,'SEMESTER_1'),
  (57,'Web X.0','INFO_32','Web X.0',20,'SEMESTER_1'),
  (58,'Data science','TRANS_09','Data science',100,'SEMESTER_2'),
  (59,'Big data','INFO_20','Big data',20,'SEMESTER_1'),
  (60,'Internet des objets (IoT)','INFO_26','Internet des objets (IoT)',100,'SEMESTER_2'),
  (61,'Bio-informatique 2','INFO_21','Bio-informatique 2',100,'SEMESTER_1'),
  (62,'Intelligence des systèmes biomédicaux','INFO_25','Intelligence des systèmes biomédicaux',25,'SEMESTER_2'),
  (63,'Gestion de réseaux de capteurs biomédicaux','INFO_22','Gestion de réseaux de capteurs biomédicaux',20,'SEMESTER_1'),
  (64,'Outils pour les données biomédicales','INFO_28','Outils pour les données biomédicales',20,'SEMESTER_1'),
  (65,'Electrophysiologie','SANTE_05','Electrophysiologie',100,'SEMESTER_2'),
  (66,'Instrumentation biomédicale 2','SANTE_06','Instrumentation biomédicale 2',100,'SEMESTER_1'),
  (67,'Télémédecine','SANTE_07','Télémédecine',100,'SEMESTER_2'),
  (68,'Etude de cas création d''entreprise','PRO_02','Etude de cas création d''entreprise',100,'ANNUAL'),
  (69,'Géomatique','ISI_13','Géomatique',100,'SEMESTER_2');
ALTER SEQUENCE "Subject_id_seq" RESTART WITH 70;

-- --
-- SPECIALIZATIONS MASTER 2 - SIS
-- --
INSERT INTO "SpecializationSubject"(id, specialization_id, skill_id, subject_id, is_optional) VALUES
  (65,5,1,37,FALSE),
  (66,5,1,39,FALSE),
  (67,5,1,51,FALSE),

  (68,5,2,61,FALSE),
  (69,5,2,56,FALSE),
  (70,5,2,62,FALSE),
  (71,5,2,60,FALSE),
  (72,5,2,55,FALSE),
  (73,5,2,63,TRUE), -- Informatique // Gestion de réseaux de capteurs biomédicaux (S1)
  (74,5,2,64,TRUE), -- Informatique // Outils pour les données biomédicales (S1)
  (75,5,2,59,TRUE), -- Informatique // Big data (S1)

  (76,5,4,58,FALSE),
  (77,5,4,48,FALSE),
  (78,5,4,47,FALSE),

  (79,5,7,65,FALSE),
  (80,5,7,66,FALSE),
  (81,5,7,67,FALSE),

  (82,5,5,49,FALSE),
  (83,5,5,50,FALSE),


-- --
-- SPECIALIZATIONS MASTER 2 - SIO
-- --
  (84,4,1,36,FALSE),
  (85,4,1,37,FALSE),
  (86,4,1,51,FALSE),
  (87,4,1,40,TRUE), -- Ingéniérie des SI // Management de la sécurité des SI (S2)
  (88,4,1,41,TRUE), -- Ingéniérie des SI // Workflows (S2)
  (89,4,1,69,TRUE), -- Ingéniérie des SI //Géomatique (S2)

  (90,4,2,42,FALSE),
  (91,4,2,59,FALSE),
  (92,4,2,56,FALSE),
  (93,4,2,60,FALSE),
  (94,4,2,55,FALSE),
  (95,4,2,43,TRUE), -- Informatique // ASI Mobile 2 (S1)
  (96,4,2,44,TRUE), -- Informatique // Web design (S1)
  (97,4,2,57,TRUE), -- Informatique // Web X.0 (S1)
  (98,4,2,63,TRUE), -- Informatique // Gestion de réseaux de capteurs biomédicaux (S1)

  (99,4,6,46,FALSE),

  (100,4,4,47,FALSE),
  (101,4,4,58,FALSE),
  (102,4,4,48,FALSE),

  (103,4,5,49,FALSE),
  (104,4,5,50,FALSE),


-- --
-- SPECIALIZATIONS MASTER 2 - SID
-- --
  (105,3,1,37,FALSE),
  (106,3,1,51,FALSE),
  (107,3,1,35,FALSE),

  (108,3,2,52,FALSE),
  (109,3,2,53,FALSE),
  (110,3,2,42,FALSE),
  (111,3,2,54,FALSE),
  (112,3,2,55,FALSE),
  (113,3,2,59,FALSE),
  (114,3,2,56,TRUE), -- Informatique // IA (S1)
  (115,3,2,57,TRUE), -- Informatique // Web X.0 (S1)
  (116,3,2,43,TRUE), -- Informatique // ASI Mobile 2 (S1)

  (117,3,6,45,FALSE),
  (118,3,6,46,FALSE),

  (119,3,4,47,FALSE),
  (120,3,4,58,FALSE),
  (121,3,4,48,FALSE),

  (122,3,5,49,FALSE),
  (123,3,5,50,FALSE),


-- --
-- SPECIALIZATIONS MASTER 2 - OSIE
-- --
  (124,2,1,34,FALSE),
  (125,2,1,35,FALSE),
  (126,2,1,36,FALSE),
  (127,2,1,37,FALSE),
  (128,2,1,38,FALSE),
  (129,2,1,39,TRUE), -- Ingéniérie des SI // Ingénierie des SI en santé (S2)
  (130,2,1,40,TRUE), -- Ingéniérie des SI // Management de la sécurité des SI (S2)
  (131,2,1,41,TRUE), -- Ingéniérie des SI // Workflows (S2)

  (132,2,2,42,FALSE),
  (133,2,2,57,FALSE),
  (134,2,2,43,TRUE), -- Informatique // ASI Mobile 2 (S1)
  (135,2,2,44,TRUE), -- Informatique // Web design (S1)
  (136,2,2,56,TRUE), -- Informatique // IA (S1)

  (137,2,6,45,FALSE),
  (138,2,6,46,FALSE),

  (139,2,4,47,FALSE),
  (140,2,4,48,FALSE),

  (141,2,5,49,FALSE),
  (142,2,5,50,FALSE);
ALTER SEQUENCE "SpecializationSubject_id_seq" RESTART WITH 143;
