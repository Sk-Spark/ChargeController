function checkExitCode {    
    if (!$?) { 
        Write-Output 'Error';
        Set-Location $workDir;
        exit; 
    }    
}

$currDir = Get-Location

# To Start API server
Set-Location .\src\server
npm start ;

Set-Location $currDir

Write-Output 'Server started'

# checkExitCode