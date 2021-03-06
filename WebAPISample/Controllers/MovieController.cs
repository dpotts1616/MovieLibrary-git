﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPISample.Data;
using WebAPISample.Models;

namespace WebAPISample.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private ApplicationContext _context;
        public MovieController(ApplicationContext context)
        {
            _context = context;
        }
        // GET api/movie
        [HttpGet]
        public IActionResult Get()
        {
            // Retrieve all movies from db logic
            var movies = _context.Movies;

            return Ok(movies);
            //return Ok(new string[] { "movie1 string", "movie2 string" });

        }

        // GET api/movie/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var movie = _context.Movies.Find(id);
            // Retrieve movie by id from db logic
            // return Ok(movie);
            return Ok(movie);
        }

        // POST api/movie
        [HttpPost]
        public IActionResult Post([FromBody]Movie value)
        {


            _context.Movies.Add(value);
            _context.SaveChangesAsync();

            // Create movie in db logic
            return Ok(value);
        }

        // PUT api/movie/id
        [HttpPut("{id}")]
        public IActionResult Put([FromBody] Movie movie,int id)
        {
            movie.MovieId = id;
            _context.Movies.Update(movie);
            _context.SaveChangesAsync();
            // Update movie in db logic
            return Ok(movie);
        }

        // DELETE api/movie/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var removeMovie = _context.Movies.Find(id);
            _context.Movies.Remove(removeMovie);
            _context.SaveChanges(); 
            // Delete movie from db logic
            return Ok(id);
        }
    }
}