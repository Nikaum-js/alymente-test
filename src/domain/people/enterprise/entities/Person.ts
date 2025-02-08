import { randomUUID } from 'node:crypto'

interface PersonProps {
  address?: string | null
  phone?: string | null
  city: string
  cpf: string
  email: string
  name: string
  state: string
  dateOfBirth: Date
}

export class Person {
  public id: string
  public address: string | null
  public phone: string | null
  public city: string
  public cpf: string
  public email: string
  public name: string
  public state: string
  public dateOfBirth: Date

  constructor(props: PersonProps, id?: string) {
    this.id = id ?? randomUUID()
    this.address = props.address ?? null
    this.phone = props.phone ?? null
    this.city = props.city
    this.cpf = props.cpf
    this.email = props.email
    this.name = props.name
    this.state = props.state
    this.dateOfBirth = props.dateOfBirth
  }
}
