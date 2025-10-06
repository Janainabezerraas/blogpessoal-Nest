import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards} from '@nestjs/common';
import { Postagem } from '../entities/postagem.entity';
import { PostagemService } from '../services/postagem.service';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Postagem')
@UseGuards(JwtAuthGuard)
@Controller('/postagens')
@ApiBearerAuth()
export class PostagemController {
  constructor(private readonly postagemSevice: PostagemService){}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Postagem[]> {
    return this.postagemSevice.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe, ) id: number): Promise<Postagem> {
    return this.postagemSevice.findById(id);
  }

  @Get('/titulo/:titulo')
  @HttpCode(HttpStatus.OK)
  findAllByTitulo(@Param('titulo') titulo: string): Promise<Postagem[]>{
    return this.postagemSevice.findAllByTitulo(titulo);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() postagem: Postagem): Promise<Postagem>{
    return this.postagemSevice.create(postagem);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() postagem: Postagem): Promise<Postagem>{
    return this.postagemSevice.update(postagem);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number){
    return this.postagemSevice.delete(id);
  }
}