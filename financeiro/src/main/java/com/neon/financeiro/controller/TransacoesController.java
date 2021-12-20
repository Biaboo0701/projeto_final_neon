package com.neon.financeiro.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.neon.financeiro.repository.Transacoes;
import com.neon.financeiro.service.CadastroTransacaoService;

@Controller
@RequestMapping("/transacoes")
public class TransacoesController {

	private Transacoes transacoes;
	
	private CadastroTransacaoService cadastroTransacaoService;
	
	
}
