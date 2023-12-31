import { Injectable } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { compare } from 'bcryptjs'
import { User } from 'src/users/entities'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor (
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser (email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne({ email })

    if (user && (await compare(pass, user.password))) {
      const { password, ...rest } = user //Esto es para que muestre todos los atributos de usuario menos la contraseña (quita la contraseña y muestra el resto)
      return rest
    }

    return null
  }

  login (user: User) {
    const { id, ...rest } = user
    const payload = { sub: id }

    return {
      user,
      accessToken: this.jwtService.sign(payload),
    }
  }
}
