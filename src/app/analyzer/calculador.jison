
/* description: Parses and executes mathematical expressions. */
/* lexical grammar */
%lex
ID          [a-zA-Z]([a-zA-Z0-9])+
%%
[#][^\n]*\n   	                        {}
\s+                   /* skip whitespace */
\f+   					                {}
\n+   					                {}
\r+   					                {}
\v+   					                {}
(\"[^\"]*\"|['][^']*['])                {/* console.log('<STRING>'+yytext);  */   return 'TEXT'; }
"true"                                  {return 'TRUE';}
"false"                                 {return 'FALSE';}
[0-9]+("."[0-9]+)?\b                    {return 'NUM';}
"@"{ID}                                 {return 'NAMEV'}
"DECLARE"                               {return 'DECLARE'}
"AS"                                    {return 'AS'}
"SET"                                   {return 'SET'}
"AND"                                   {return 'AND'}
"OR"                                    {return 'OR'}
"NOT"                                    {return 'NOT'}
"INPUT"                                 {return 'INPUT'}
"PRINT"                                 {return 'PRINT'}
"IF"                                    {return 'IF'}
"THEN"                                  {return 'THEN'}
"END"                                   {return 'END'}
"ELSEIF"                                {return 'ELSEIF'}
"SELECT"                                {return 'SELECT'}
"FROM"                                  {return 'FROM'}
"WHERE"                                 {return 'WHERE'}
"LIMIT"                                 {return 'LIMIT'}
"OFFSET"                                {return 'OFFSET'}
/*ARITMETICAS*/
"INT"                                   {return 'INT';}
"STRING"                                {return 'STRING';}
"TEXT"                                  {return 'TEX';}
"DECIMAL"                               {return 'DECIMAL';}
"BOOLEAN"                               {return 'BOOLEAN';}
/*ARITMETICAS*/
"*"                                     {return '*';}
"/"                                     {return '/';}
"-"                                     {return '-';}
"+"                                     {return '+';}
/*RELACIONAL*/
"!="                                    {return '!=';}
"=="                                    {return '==';}
"<="                                    {return '<=';}
">="                                    {return '>=';}
"<>"                                    {return '<>';}
"<"                                     {return '<';}
">"                                     {return '>';}
"!"                                     {return '!';}
"||"                                    {return '||';}
"&&"                                    {return '&&';}
/*AGRUPACION*/
"("                                     {return '(';}
")"                                     {return ')';}
/*OTROS*/
";"                                     {return ';';}
","                                     {return ',';}
"="                                     {return '=';}
/*TOKEN COMPLEJOS*/
[a-zA-Z][a-zA-Z0-9]+([_]+[a-zA-Z0-9]+)+ {return 'PROPERTY_NAME'}
{ID}                                    {return 'TABLE_NAME'}
<<EOF>>                                 {return 'EOF';}
.                                       {console.log('<ERROR>'+yytext);return 'INVALID';}

/lex

/* operator associations and precedence */
%left UMINU
%left '!'
%left '&&'
%left '||' 
%left OR AND NOT
%left '==' '!=' '<' '<=' '>' '>=' '<>' '='
%left '+' '-'
%left '*' '/'

%token INVALID

%start expressions

%% /* language grammar */
/*inicio de la gramatica */
expressions
    : acciones EOF
    | EOF
    ;
acciones 
    : acciones realizar
    |realizar
    ;
realizar 
 /*CREAR TABLA*/
    :tabla e_p_c {return $$;} 
     /*ASIGNA NUEVO ELEMENTO A TABLA*/
    | asignar_informacion_tabla e_p_c
    /*IMPRIMIR*/
    | imprimir e_p_c
    /*DECLARAR VARIABLE*/
    | declarar asignar 
    /*ASIGNAR VALOR*/
    | asignar_valor  e_p_c
    /*if*/
    | if END IF e_p_c 
     /*SELECT*/
    | select e_p_c
    ;
/*MANEJO DE ERRORES SINTACTICO*/
e_p_c : ';'  | ERROR ; //error te falta ;
e_f_t : FROM | ERROR;   //te falto el from
e_t_f : THEN |  ERROR;  //te falta if indicar then
e_d   : dato |  ERROR;  //te falto indicar la asignacion
e_c_s : col_todo |  ERROR;  //te falto indicar que columna
e_a_c_t: atributo_tabla |  ERROR; //te falta atributos a la tabla
e_f_t_t: tipo_atributo |  ERROR;    //falta tipo en atributo de tabla
/*SELECT*/

select : SELECT e_c_s e_f_t nombre_atributo s_f ;

s_f
    :v_f
    |
    ;

v_f
    : v_f  tipjo_filtro
    | tipjo_filtro
    ;

tipjo_filtro
    : WHERE  e_d 
    | LIMIT e_d 
    | OFFSET e_d 
    ;
col_todo
    :
    '*'
    |  bucle_serie
    ;

bucle_serie
    : bucle_serie ',' serie
    |serie
    ;

serie
    : PROPERTY_NAME
    | TABLE_NAME
    | NAMEV
    ;
nombre_serie 
    :nombre_serie ',' nombre_atributo
    |nombre_atributo
    ;
/*IF*/

if : IF e_d e_t_f  acciones final_if  ;

final_if 
    :
    ELSE acciones 
    | ELSEIF e_d e_t_f acciones final_if
    | 
    ;

/*ASIGNAR VALOR*/

asignar_valor  : SET asignar ;

asignar 
    : asignar ',' NAMEV '=' e_d 
    | NAMEV '=' e_d
    ;

/*DECLARAR VARIABLE*/

declarar : DECLARE secuencia_nombres AS tipo_atributo ;

secuencia_nombres 
    :secuencia_nombres ','  NAMEV
    |NAMEV
    ;

asignar 
    : '=' e_d e_p_c
    | e_p_c 
    ;

/*IMPRIMIR*/

imprimir : PRINT '(' dato_secuencia ')' ;

dato_secuencia 
    :dato_secuencia ',' e_d 
    | e_d
    ; 
    

/*ASIGNA NUEVO ELEMENTO A TABLA*/

asignar_informacion_tabla 
    :
    asignar_informacion_tabla ','  nombre_atributo '=' e_d 
    |nombre_atributo '=' e_d 
    ; 
/*CREAR TABLA*/

tabla : TABLE_NAME '(' e_a_c_t ')' ;

atributo_tabla 
    : 
    atributo_tabla ','  nombre_atributo e_f_t_t 
    |nombre_atributo e_f_t_t
    ;
nombre_atributo 
    : 
     PROPERTY_NAME 
    |TABLE_NAME
    ;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*listado atributo*/
tipo_atributo
    :
    INT
    |STRING
    |DECIMAL
    |BOOLEAN
    |TEX
    ;
/*OPERACIONES*/
dato : e ;
e
    /*OPERACION MATEMATICA*/
    : e '+' e {$$ = $1 + $3;}
    | e '-' e {$$ = $1 - $3;}
    | e '*' e {$$ = $1 * $3;}
    | e '/' e {$$ = $1 / $3;}
    | '-' e   %prec UMINUS {$$ = -$2;}
    | '(' e ')' {$$ = $2;}
    /*OPERACION RELACIONAL*/
    | e '==' e 
    | e '!=' e 
    | e '<' e 
    | e '<=' e 
    | e '>' e 
    | e '>=' e 
    | e '<>' e 
    | e OR e 
    | e AND e 
    | e '||' e 
    | e '&&' e 
    | '!' e 
    | NOT e
    /*DATOS A OPERAR*/
    | NUM {$$ = Number(yytext);}
    | INPUT '(' TEXT ')' 
    | TEXT 
    | u_v
    ;
u_v 
    : serie  a_v
    ;
a_v
    : '=' e
    |
    ;