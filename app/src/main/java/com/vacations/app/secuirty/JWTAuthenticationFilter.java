package com.vacations.app.secuirty;

import com.vacations.app.entity.User;
import com.vacations.app.service.UserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

public class JWTAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JWTToken jwtToken;

    @Autowired
    private UserDetailsService service;

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
                                    FilterChain filterChain) throws ServletException, IOException {
        try {
            String jwt="";
            String barerToken= httpServletRequest.getHeader(SecurityConstants.HEADER_STRING);
            if (StringUtils.hasText(barerToken)&& barerToken.startsWith(SecurityConstants.TOKEN_PREFIX)){
                 jwt= barerToken.substring(7, barerToken.length());
            }

            if (StringUtils.hasText(jwt)&& jwtToken.validateToken(jwt)){
                Long userId=jwtToken.getUserIdFromJWT(jwt);
                User userDetails=service.loadUserById(userId);

                UsernamePasswordAuthenticationToken authenticationToken=new UsernamePasswordAuthenticationToken(
                        userDetails, null, Collections.emptyList()
                );
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest));
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        }catch (Exception ex){
            logger.error("Could not set user authentication ", ex);
        }
        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }
}
