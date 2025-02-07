export class PersonEmailAlreadyExistsError extends Error {
  constructor() {
    super('E-mail already exists.')
  }
}

export class PersonCpfAlreadyExistsError extends Error {
  constructor() {
    super('CPF already exists.')
  }
}

export class PersonNotFoundError extends Error {
  constructor() {
    super('Person not founds.')
  }
}
