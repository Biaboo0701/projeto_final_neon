package com.neon.financeiro.thymeleaf;

import java.util.HashSet;
import java.util.Set;

import org.thymeleaf.dialect.AbstractProcessorDialect;
import org.thymeleaf.processor.IProcessor;
import org.thymeleaf.standard.StandardDialect;

import com.neon.financeiro.thymeleaf.processor.ClassForErrorAttributeTagProcessor;

public class FinanceiroDialect extends AbstractProcessorDialect {
	
	public FinanceiroDialect() {
		super("NEON financeiro", "financeiro", StandardDialect.PROCESSOR_PRECEDENCE);
	}

	@Override
	public Set<IProcessor> getProcessors(String dialectPrefix) {
		final Set<IProcessor> processadores = new HashSet<>();
		processadores.add(new ClassForErrorAttributeTagProcessor(dialectPrefix));
		return processadores;
	}
}
