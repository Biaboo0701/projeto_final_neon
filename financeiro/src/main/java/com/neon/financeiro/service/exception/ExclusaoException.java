package com.neon.financeiro.service.exception;

public class ExclusaoException extends RuntimeException{

	private static final long serialVersionUID = 1L;

	public ExclusaoException(String msg) {
		super (msg);
	}
}