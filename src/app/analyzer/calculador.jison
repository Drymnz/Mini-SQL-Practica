
/* description: Parses and executes mathematical expressions. */
/* lexical grammar */
%{
    listadoErrores = [];
    function printText(yytext) {
        /*sector de pruevas*/
    //console.log(yytext);
  }
%}
%lex
ID          [a-zA-Z]([a-zA-Z0-9])+
%%
[#][^\n]*\n   	                        {}
[-][-][^\n]*\n   	                        {}
\s+                   /* skip whitespace */
\f+   					                {}
\n+   					                {}
\r+   					                {}
\v+   					                {}
(\"[^\"]*\"|['][^']*['])                {printText(yytext+'  TEXT');return 'TEXT'; }
"true"                                  {printText(yytext+'  TRUE');return 'TRUE';}
"false"                                 {printText(yytext+'  FALSE');return 'FALSE';}
[0-9]+("."[0-9]+)\b                     {printText(yytext+'  DECIMAL');return 'DECIMAL';}
[0-9]+                                  {printText(yytext+'  NUM');return 'NUM';}
"@"{ID}                                 {printText(yytext+'  NAMEV');return 'NAMEV'}
"DECLARE"                               {printText(yytext+'  DECLARE');return 'DECLARE'}
"AS"                                    {printText(yytext+'  AS');return 'AS'}
"SET"                                   {printText(yytext+'  SET');return 'SET'}
"AND"                                   {printText(yytext+'  AND');return 'AND'}
"OR"                                    {printText(yytext+'  OR');return 'OR'}
"NOT"                                   {printText(yytext+'  NOT');return 'NOT'}
"INPUT"                                 {printText(yytext+'  INPUT');return 'INPUT'}
"PRINT"                                 {printText(yytext+'  PRINT');return 'PRINT'}

"IF"                                    {printText(yytext+'  IF');return 'IF'}
"THEN"                                  {printText(yytext+'  THEN');return 'THEN'}
"END"                                   {printText(yytext+'  END');return 'END'}
"END"                                   {printText(yytext+'  END');return 'END'}
"ELSE"                                  {printText(yytext+'  ELSE');return 'ELSE'}
"ELSEIF"                                 {printText(yytext+'  ELSEIF');return 'ELSEIF'}

"SELECT"                                {printText(yytext+'  SELECT');return 'SELECT'}
"FROM"                                  {printText(yytext+'  FROM');return 'FROM'}
"WHERE"                                 {printText(yytext+'  WHERE');return 'WHERE'}
"LIMIT"                                 {printText(yytext+'  LIMIT');return 'LIMIT'}
"OFFSET"                                {printText(yytext+'  OFFSET');return 'OFFSET'}
/*ARITMETICAS*/
"INT"                                   {printText(yytext+'  INT');return 'INT';}
"STRING"                                {printText(yytext+'  STRING');return 'STRING';}
"TEXT"                                  {printText(yytext+'  TEX');return 'TEX';}
"DECIMAL"                               {printText(yytext+'  DECIMAL');return 'DECIMAL';}
"BOOLEAN"                               {printText(yytext+'  BOOLEAN');return 'BOOLEAN';}
/*ARITMETICAS*/
"*"                                     {printText(yytext+'  *');return '*';}
"/"                                     {printText(yytext+'  /');return '/';}
"-"                                     {printText(yytext+'  -');return '-';}
"+"                                     {printText(yytext+'  +');return '+';}
/*RELACIONAL*/
"!="                                    {printText(yytext+'  !=');return '!=';}
"=="                                    {printText(yytext+'  ==');return '==';}
"<="                                    {printText(yytext+'  <=');return '<=';}
">="                                    {printText(yytext+'  >=');return '>=';}
"<>"                                    {printText(yytext+'  <>');return '<>';}
"<"                                     {printText(yytext+'  <');return '<';}
">"                                     {printText(yytext+'  >');return '>';}
"!"                                     {printText(yytext+'  !');return '!';}
"||"                                    {printText(yytext+'  ||');return '||';}
"&&"                                    {printText(yytext+'  &&');return '&&';}
/*AGRUPACION*/
"("                                     {printText(yytext+'  (');return '(';}
")"                                     {printText(yytext+'  )');return ')';}
/*OTROS*/
";"                                     {printText(yytext+'  ;');return ';';}
","                                     {printText(yytext+'  ,');return ',';}
"="                                     {printText(yytext+'  =');return '=';}
/*TOKEN COMPLEJOS*/
[a-zA-Z][a-zA-Z0-9]+([_]+[a-zA-Z0-9]+)+ {printText(yytext+'  PROPERTY_NAME');return 'PROPERTY_NAME'}
{ID}                                    {printText(yytext+'  TABLE_NAME');return 'TABLE_NAME'}
<<EOF>>                                 {printText(yytext+'  EOF');return 'EOF';}
.                                       {printText(yytext+'  INVALID');
//listadoErrores.push(
    //new yy.ErrorParser(this._$.first_line, this._$.first_column,yy.TipoErrorParser.INVALID,yytext));
}

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
    : acciones EOF  { $$.push(listadoErrores); return $1; }
    | EOF {$$ = []; $$.push(listadoErrores); return $1;}
    ;
acciones 
    : acciones realizar  { $$ = $1; $$.push($2); }
    | realizar {$$ = []; $$.push($1);}
    ;
realizar 
 /*CREAR TABLA*/
    :tabla e_p_c  { $$ = $1; }
     /*ASIGNA NUEVO ELEMENTO A TABLA*/
    | asignar_informacion_tabla e_p_c { $$ = new yy.ElementoTabla(this._$.first_line, this._$.first_column, $1); }
    /*IMPRIMIR*/
    | imprimir e_p_c { $$ = $1; }
    /*DECLARAR VARIABLE*/
    | declarar  { $$ = $1; }
    /*ASIGNAR VALOR*/
    | asignar_valor  e_p_c { $$ = $1; }
    /*SELECT*/
    | select e_p_c { $$ = $1; }
    /*if*/
    | if END IF e_p_c  { $$ = $1; }
    ;
/*MANEJO DE ERRORES SINTACTICO*/
e_p_c : ';' { $$ = $1; }  | ERROR 
{listadoErrores.push(new yy.ElementoTabla(this._$.first_line, this._$.first_column,yy.TipoErrorParser.INVALID,yytext));}; //error te falta ;
e_f_t : FROM { $$ = $1; } | ERROR;   //te falto el from
e_t_f : THEN { $$ = $1; } |  ERROR;  //te falta if indicar then
e_d   : dato { $$ = $1; } |  ERROR;  //te falto indicar la asignacion
e_c_s : col_todo { $$ = $1; }|  ERROR;  //te falto indicar que columna
e_a_c_t: atributo_tabla { $$ = $1; } |  ERROR; //te falta atributos a la tabla
e_f_t_t: tipo_atributo { $$ = $1; } |  ERROR;    //falta tipo en atributo de tabla
/*SELECT*/

select : SELECT e_c_s e_f_t nombre_atributo s_f 
{ $$ = new yy.Consulta(this._$.first_line, this._$.first_column,$2,$4,$5); };

s_f
    :v_f{$$=$1;}
    | {$$=undefined;}
    ;

v_f
    : v_f  tipjo_filtro {$$.push($2);}
    | tipjo_filtro {$$ = []; $$.push($1);}
    ;

tipjo_filtro
    : WHERE  e_d 
    { $$ = new yy.Filtro(this._$.first_line, this._$.first_column, yy.TipoFiltro.WHERE,$2); }
    | LIMIT e_d 
    { $$ = new yy.Filtro(this._$.first_line, this._$.first_column, yy.TipoFiltro.LIMIT,$2); }
    | OFFSET e_d 
    { $$ = new yy.Filtro(this._$.first_line, this._$.first_column, yy.TipoFiltro.OFFSET,$2); }
    ;
col_todo
    :
    '*' {$$=$1;}
    |  bucle_serie {$$=$1;}
    ;

bucle_serie
    : bucle_serie ',' serie {$$.push($3);}
    |serie {$$ = []; $$.push($1);}
    ;

serie
    : PROPERTY_NAME //{$$=$1;}
    { $$ = new yy.Valor(this._$.first_line, this._$.first_column, $1, yy.TipoDato.VARIABLE); }
    | TABLE_NAME //{$$=$1;}
    { $$ = new yy.Valor(this._$.first_line, this._$.first_column, $1, yy.TipoDato.VARIABLE); }
    | NAMEV //{$$=$1;}
    { $$ = new yy.Valor(this._$.first_line, this._$.first_column, $1, yy.TipoDato.VARIABLE); }
    ;
/*IF*/

if : IF e_d e_t_f  acciones final_if 
{ $$ = new yy.InstruccionIF(this._$.first_line, this._$.first_column,$2,$4,$5)};

final_if 
    :
    ELSE acciones 
    { $$ = new yy.InstruccionELSE(this._$.first_line, this._$.first_column,$2)}
    | ELSEIF e_d e_t_f acciones final_if
    { $$ = new yy.InstruccionELSEIF(this._$.first_line, this._$.first_column,$2,$4,$5)}
    | {$$=undefined;}
    ;

/*ASIGNAR VALOR*/

asignar_valor  : SET asignar  { $$ = new yy.Set(this._$.first_line, this._$.first_column, $2); };

asignar 
    : asignar ',' NAMEV '=' e_d  {$$.push(new yy.Asignacion(this._$.first_line, this._$.first_column, $3, $5)); } 
    | NAMEV '=' e_d {$$ = [];  $$.push(new yy.Asignacion(this._$.first_line, this._$.first_column, $1, $3)); } 
    ;

/*DECLARAR VARIABLE*/

declarar : DECLARE secuencia_nombres AS e_f_t_t asignar 
{ $$ = new yy.Declaracion(this._$.first_line, this._$.first_column, $2, $4 , $5); };

secuencia_nombres 
    :secuencia_nombres ','  NAMEV {$$.push($3);}
    |NAMEV {$$ = []; $$.push($1);}
    ;

asignar 
    : '=' e_d e_p_c  {$$=$2;}
    | e_p_c {$$=undefined;}
    ;

/*IMPRIMIR*/

imprimir : PRINT '(' dato_secuencia ')' { $$ = new yy.Imprimir(this._$.first_line, this._$.first_column, $3); } ; 

dato_secuencia 
    :dato_secuencia ',' e_d {$$.push($3);}
    | e_d {$$ = []; $$.push($1);}
    ; 
    
/*ASIGNA NUEVO ELEMENTO A TABLA*/

asignar_informacion_tabla 
    :
    asignar_informacion_tabla ',' s_a_i {$$.push($3);}
    |s_a_i {$$ = []; $$.push($1);}
    ; 

s_a_i :nombre_atributo '=' e_d { $$ = new yy.Asignacion(this._$.first_line, this._$.first_column, $1, $3); } ;
/*CREAR TABLA*/

tabla : TABLE_NAME '(' e_a_c_t ')' { $$ = new yy.Tabla(this._$.first_line, this._$.first_column, $1, $3); } ;

atributo_tabla 
    : 
    atributo_tabla ',' nuveo_atributo {$$.push($3);}
    | nuveo_atributo {$$ = []; $$.push($1);}
    ;

nuveo_atributo : nombre_atributo e_f_t_t  { $$ = new yy.Atributo(this._$.first_line, this._$.first_column, $1, $2); } ;

nombre_atributo 
    : 
     PROPERTY_NAME { $$ = $1; }
    |TABLE_NAME { $$ = $1; }
    ;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*listado atributo*/
tipo_atributo
    :
    INT { $$ = yy.TipoDato.INT; }
    |STRING { $$ = yy.TipoDato.STRING; }
    |DECIMAL { $$ = yy.TipoDato.DECIMAL; }
    |BOOLEAN { $$ = yy.TipoDato.BOOLEAN; }
    |TEX { $$ = yy.TipoDato.STRING; }
    ;
/*OPERACIONES*/
dato : e { $$ = $1; } ;
e
    /*OPERACION MATEMATICA*/
    : e '+' e { $$ = new yy.Opereaciones(this._$.first_line, this._$.first_column, yy.TipoOperacion.SUMA,$1,  $3); }
    | e '-' e  { $$ = new yy.Opereaciones(this._$.first_line, this._$.first_column, yy.TipoOperacion.RESTA,$1,  $3); }
    | e '*' e  { $$ = new yy.Opereaciones(this._$.first_line, this._$.first_column, yy.TipoOperacion.MULTIPLICACION,$1,  $3); }
    | e '/' e  { $$ = new yy.Opereaciones(this._$.first_line, this._$.first_column, yy.TipoOperacion.DIVISION,$1,  $3); }
    | '-' e   %prec UMINUS { $$ = new yy.Opereaciones(this._$.first_line, this._$.first_column, yy.TipoOperacion.NEGATIVO,undefined,$2 ); }
    | '(' e ')' {$$ = $2;}
    /*OPERACION RELACIONAL*/
    | e '==' e { $$ = new yy.Opereaciones(this._$.first_line, this._$.first_column, yy.TipoOperacion.IGUAL,$1,  $3); }
    | e '!=' e { $$ = new yy.Opereaciones(this._$.first_line, this._$.first_column, yy.TipoOperacion.NO_IGUAL,$1,  $3); }
    | e '<' e { $$ = new yy.Opereaciones(this._$.first_line, this._$.first_column, yy.TipoOperacion.MENOR,$1,  $3); }
    | e '<=' e { $$ = new yy.Opereaciones(this._$.first_line, this._$.first_column, yy.TipoOperacion.MENOR_IGUAL,$1,  $3); }
    | e '>' e { $$ = new yy.Opereaciones(this._$.first_line, this._$.first_column, yy.TipoOperacion.MAYOR,$1,  $3); }
    | e '>=' e { $$ = new yy.Opereaciones(this._$.first_line, this._$.first_column, yy.TipoOperacion.MAYOR_IGUAL,$1,  $3); }
    | e '<>' e { $$ = new yy.Opereaciones(this._$.first_line, this._$.first_column, yy.TipoOperacion.NO_IGUAL,$1,  $3); }
    | e OR e { $$ = new yy.Opereaciones(this._$.first_line, this._$.first_column, yy.TipoOperacion.OR,$1,  $3); }
    | e AND e { $$ = new yy.Opereaciones(this._$.first_line, this._$.first_column, yy.TipoOperacion.AND,$1,  $3); }
    | e '||' e  { $$ = new yy.Opereaciones(this._$.first_line, this._$.first_column, yy.TipoOperacion.OR,$1,  $3); }
    | e '&&' e { $$ = new yy.Opereaciones(this._$.first_line, this._$.first_column, yy.TipoOperacion.AND,$1, $3); }
    | '!' e { $$ = new yy.Opereaciones(this._$.first_line, this._$.first_column, yy.TipoOperacion.NEGACION,undefined,$2 ); }
    | NOT e { $$ = new yy.Opereaciones(this._$.first_line, this._$.first_column, yy.TipoOperacion.NEGACION,undefined,$2); }
    /*DATOS A OPERAR*/
    | DECIMAL  { $$ = new yy.Valor(this._$.first_line, this._$.first_column, $1, yy.TipoDato.DECIMAL); }
    | NUM { $$ = new yy.Valor(this._$.first_line, this._$.first_column, $1, yy.TipoDato.INT); }
    | INPUT '(' TEXT ')' { $$ = new yy.Valor(this._$.first_line, this._$.first_column, $1, yy.TipoDato.ENTRADA); }
    | TEXT  { $$ = new yy.Valor(this._$.first_line, this._$.first_column, $1, yy.TipoDato.STRING); }
    | u_v {$$ = $1;}
    //BOOLEAN
    | FALSE { $$ = new yy.Valor(this._$.first_line, this._$.first_column, $1, yy.TipoDato.BOOLEAN); }
    | TRUE { $$ = new yy.Valor(this._$.first_line, this._$.first_column, $1, yy.TipoDato.BOOLEAN); }
    ;
    
u_v  : serie  a_v { 
     /**vereificar*/ 
 if ($2 == undefined) {
    $$ = $1;
 } else {
    $$ = new yy.Opereaciones(this._$.first_line, this._$.first_column, yy.TipoOperacion.IGUAL,$1,$2);
 }
    } ;
a_v
    : '=' e { $$ = $2; }
    | {$$=undefined;}
    ;