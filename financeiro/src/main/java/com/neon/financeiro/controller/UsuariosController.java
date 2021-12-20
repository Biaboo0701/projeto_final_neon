package com.neon.financeiro.controller;

import javax.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.neon.financeiro.model.Usuario;
import com.neon.financeiro.repository.Usuarios;
import com.neon.financeiro.service.CadastroUsuarioService;

@Controller
@RequestMapping("/usuario")
public class UsuariosController {

	private Usuarios usuarios;
	
	private CadastroUsuarioService cadastroUsuarioService;
	
	@RequestMapping("/cadastro")
	public ModelAndView cadastroNovo (Usuario usuario) {
		return new ModelAndView("usuario/CadastroUsuario");
	}
	
	@RequestMapping(value = "/cadastro", method = RequestMethod.POST)
	public ModelAndView cadastroSalvar(@Valid Usuario usuario, BindingResult result, 
			RedirectAttributes attributes) {
		if(result.hasErrors())
			return cadastroNovo(usuario);
		
		cadastroUsuarioService.salvar(usuario);
		
		return new ModelAndView("redirect:/usuario/cadastro");
	}
	
	@RequestMapping("/login")
	public ModelAndView loginNovo(Usuario usuario) {
		return new ModelAndView("usuario/LoginUsuario");
	}
	
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public ModelAndView login (Usuario usuario) {
		
		
		return new ModelAndView("redirect:/usuario/home/{id}");
	}
	
	@RequestMapping("/home/{id}")
	public ModelAndView home (@PathVariable("id") Long id) {
		ModelAndView mv = new ModelAndView();
		
		
		
		return mv;
	}
	
}
