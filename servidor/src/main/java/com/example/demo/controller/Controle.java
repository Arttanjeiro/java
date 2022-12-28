package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Pessoa;
import com.example.demo.repository.RepositoryPessoa;




@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/users")
public class Controle {
  @Autowired
  RepositoryPessoa repositoryPessoa;

  @GetMapping("/user")
  public List <Pessoa> listPessoa(){
    return repositoryPessoa.findAll();
  }
  
 @GetMapping("/conte")
 public long contador(){
  return repositoryPessoa.count();
 }
 
 
  @PostMapping("/create")
  public Pessoa createPessoa(@RequestBody Pessoa pessoa){
    return  repositoryPessoa.save(pessoa) ;

  }
  
  
  
}
