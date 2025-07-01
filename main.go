package main

import (
	"context"
	"embed"
	"go-wails-svelte5-template/app"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

var appobj *app.App

func main() {
	// Create an instance of the app structure
	appobj = app.NewApp()

	// Create application with options
	err := wails.Run(&options.App{
		Title:  "wails-template-svelte",
		Width:  1024,
		Height: 768,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 0, G: 0, B: 0, A: 255},
		OnStartup:        startup,
		Frameless:        true,
		Bind: []interface{}{
			appobj,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}

func startup(ctx context.Context) {
	app.Startup(appobj, ctx)
}
