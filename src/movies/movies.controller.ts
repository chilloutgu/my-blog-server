import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('movies')
export class MoviesController {

  @Get()
  getAll(): string {
    return "this will return all movies";
  }

  @Get("/search")
  search(@Query("year") year: number): string {
    return `we are searching movie made after : ${year}`;
  }

  @Get("/:id")
  getOne(@Param("id") movieId: string): string {
    return `this will return one movie wtih the id: ${movieId}`;
  }

  @Post()
  create(@Body() movieData) {
    return movieData;
  }

  @Delete("/:id")
  remove(@Param("id") movieId: string): string {
    return `this will remove a movie with the id: ${movieId}`;
  }

  @Patch("/:id")
  updateMovie(@Param("id") movieId: string, @Body() updateData): string {
    return `this will update a movie with the id: ${movieId}`;
  }


}
