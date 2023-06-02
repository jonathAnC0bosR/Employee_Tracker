INSERT INTO department(name)
VALUES("Production"),
      ("Sales"),
      ("Marketing"),
      ("Finance"),
      ("IT"),
      ("Human resources");

INSERT INTO role (title, salary, department_id)
VALUES("Sales Lead", "120000", 2),
      ("Software Engineer", "130000", 5),
      ("Machine Operator", "100000", 1),
      ("Accountant", "70000", 4),
      ("Phycologist", "75000", 6), 
      ("Graphic Designer", "80000", 3);

-- INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- VALUES ("")