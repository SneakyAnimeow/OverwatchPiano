# OverwatchPiano
***
Overwatch Midi Converter with its own with midis database. Written using React.js on frontend and .NET Core on backend and Microsoft SQL Server as database engine.


# How to compile
***
Build as Release and then type into terminal:
```shell
dotnet publish -c Release -o Build
```
(Also don't forget to install all node.js dependencies before compiling!)

# Startup
***
After first start application will close automatically and create file app_config.xml. Change default values in it and start app again.

####app_config.xml
```xml
<AppConfig xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
    <MssqlConfig>
        <Server>localhost</Server> <!--Database IP-->
        <User>sa</User> <!--User that has read/write access to Piano Database-->
        <Password>SaPassword</Password> <!--Password of that User-->
        <Database>Piano</Database> <!--Piano Database-->
        <Port>1433</Port> <!--Port of SQL Server, set to 0 if you don't wanna include it in connection string-->
    </MssqlConfig>
    <PianoConfig>
        <Port>80</Port> <!-- Your app port HTTP-->
        <SecureCode>5xK1ep2W45Z0</SecureCode> <!--Secure Code randomly generated on start, used by your app to authenticate while uploading a song-->
        <IsDevelopment>false</IsDevelopment> <!--Stops reading your apps port from this config file-->
        <IsWindowsAuth>false</IsWindowsAuth> <!--Switches from using User+Password to IntegratedSecurity while connecting to SQL Server-->
    </PianoConfig>
</AppConfig>
```

#Database Configuration
***
After setting up your SQL Server (Express is far more than enough), create database you want to provide for this app and create new table using this code. Replace ```[Piano]``` with the name of your database, like this ```[MyDatabaseIsMuchMoreCoolThanPiano]```.
```tsql
USE [Piano]
GO

/****** Object:  Table [dbo].[Song]    Script Date: 1/7/2022 3:06:15 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Song](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](256) NOT NULL,
	[Author] [nvarchar](128) NULL,
	[Data] [varchar](max) NOT NULL,
	[RecommendedAmount] [int] NULL,
 CONSTRAINT [PK_Song] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
```


# Additional Info
***

This app does not use HTTPS so it is recommended that connections to app are provided through some sort of Reverse Proxy (WebServer) like <a href="https://www.nginx.com/">Nginx</a> for Linux or <a href="https://www.iis.net/">IIS</a> for Windows.


# License
***
Code of this app is licensed under <a href="https://tldrlegal.com/license/mit-license">MIT License</a> but code used from Overwatch MIDI converter by ScroogeD2 uses <a href="https://tldrlegal.com/license/gnu-general-public-license-v3-(gpl-3)">GNU General Public License v3.0</a>.


# Credits
***
- <a href='https://github.com/ScroogeD2/owmidiconverter'>Overwatch MIDI converter<a/> by <a href="https://github.com/ScroogeD2/">ScroogeD2</a>