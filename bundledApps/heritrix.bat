@echo off 
set here=%cd%
set JAVA_HOME=%here%/openjdk
set JRE_HOME=%here%/openjdk/jre
set start=%here%/heritrix-3.2.0/bin/heritrix.cmd

echo starting  %1 %2

%start% %1 %2